import { computed, onMounted, onUnmounted, reactive, watchEffect } from "vue";
import { AUDIOS, playAudio, stopAudio } from "./audio";
import {
  INITIAL_SPAWN,
  INITIAL_TIME_REMAINING,
  POP_TABLE,
  SCORE,
} from "./consts";

export type Scene = "start" | "game" | "result";
export type GameObjectType = "kani" | "kanimodoki" | "rabbit" | "lop";
export type GameOverReason =
  | "timeover"
  | "tap-kani"
  | "tap-rabbit"
  | "tap-lop"
  | null;
export interface GameObject {
  id: number;
  type: GameObjectType;
}

export const state = reactive({
  scene: "start" as Scene,
  timeRemaining: INITIAL_TIME_REMAINING,
  timeElapsed: 0,
  timeSagiRemaining: 0,
  lastId: 0,
  objects: [] as GameObject[],
  scoreSource: {
    kanimodoki: 0,
    sagi: 0,
    sagiTimer: 0,
    sagiSweep: 0,
    scoreview: 0,
    timer: 0,
  },
  gameoverReason: null as GameOverReason,
});

const onEverySeconds = () => {
  state.timeRemaining--;
  state.timeElapsed++;

  if (state.scoreSource.sagi > 0 && state.timeSagiRemaining > 0) {
    state.timeSagiRemaining--;
  }

  if (state.timeRemaining <= 0) {
    state.gameoverReason = "timeover";
    goScene("result");
  }

  const spawnCount = 1 + Math.floor((Math.random() * state.timeElapsed) / 1.3);

  for (let i = 0; i < spawnCount; i++) {
    spawn();
  }
};

export const useSetupGame = () => {
  state.scene = "game";
  state.timeRemaining = INITIAL_TIME_REMAINING;
  state.timeElapsed = 0;
  state.lastId = 0;
  state.objects = [];
  for (let i = 0; i < INITIAL_SPAWN; i++) {
    spawn();
  }
  for (const key of Object.keys(state.scoreSource)) {
    state.scoreSource[key as keyof typeof state.scoreSource] = 0;
  }
  state.gameoverReason = null;

  playAudio(AUDIOS.BGM);

  let timer = 0;
  const stopEffect = watchEffect(() => {
    if (score.value > 0) {
      playAudio(AUDIOS.GAIN);
    }
  });
  onMounted(() => {
    timer = setInterval(onEverySeconds, 1000);
  });
  onUnmounted(() => {
    stopAudio(AUDIOS.BGM);
    stopEffect();
    clearInterval(timer);
  });
};

export const score = computed(() =>
  Object.values(state.scoreSource).reduce((acc, e) => acc + e, 0)
);

export const spawn = () => {
  const sum = POP_TABLE.reduce((acc, e) => acc + e[0], 0);
  const dice = Math.random() * sum;
  let threshold = 0;

  for (const [prob, type] of POP_TABLE) {
    threshold += prob;
    if (dice < threshold) {
      state.objects.push({
        id: ++state.lastId,
        type,
      });

      return;
    }
  }
};

export const destroy = ({ id, type }: GameObject) => {
  state.objects = state.objects.filter((e) => e.id !== id);

  if (state.timeSagiRemaining > 0) {
    state.scoreSource.sagiSweep += SCORE.SAGI_SWEEP;
    return;
  }

  if (type === "kanimodoki") {
    state.scoreSource.kanimodoki += SCORE.KANIMODOKI;
    return;
  }
  if (type === "kani") {
    state.gameoverReason = "tap-kani";
    goScene("result");
    return;
  }
  if (type === "rabbit") {
    state.gameoverReason = "tap-rabbit";
    goScene("result");
    return;
  }
  if (type === "lop") {
    state.gameoverReason = "tap-lop";
    goScene("result");
    return;
  }
};

export const goScene = (scene: Scene) => {
  state.scene = scene;
};
