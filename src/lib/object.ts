import { reactive, computed, onMounted, onUnmounted, CSSProperties } from "vue";
import {
  FRAME,
  OBJECT_MAX_PX_PER_SEC,
  OBJECT_MIN_PX_PER_SEC,
  IMAGE_SIZE,
  OBJECT_HEIGHT,
} from "./consts";
import srcKani from "../assets/kani.png";
import srcLop from "../assets/lop.png";
import srcRabbit from "../assets/rabbit.png";
import srcSagi from "../assets/sagi.png";
import { GameObjectType } from "./game";

export const useRoundTripBehavior = (options: { rotate90deg: boolean }) => {
  const { sceneWidth, sceneHeight } = getSceneViewport();

  const delta =
    (OBJECT_MIN_PX_PER_SEC +
      Math.random() * (OBJECT_MAX_PX_PER_SEC - OBJECT_MIN_PX_PER_SEC)) /
    FRAME;
  const { p, q, rad } = (() => {
    while (true) {
      const p = {
        top: Math.random() * sceneHeight,
        left: Math.random() * sceneWidth,
      };
      const q = {
        top: Math.random() * sceneHeight,
        left: Math.random() * sceneWidth,
      };

      if (
        (p.top - q.top) ** 2 + (p.left - q.left) ** 2 >
        (FRAME * delta) ** 2
      ) {
        return {
          p,
          q,
          rad: 2.5 * Math.PI - Math.atan2(p.top - q.top, q.left - p.left),
        };
      }
    }
  })();

  const state = reactive({
    top: p.top,
    left: p.left,
    direction: 1,
  });

  const update = () => {
    state.top += state.direction * delta * Math.cos(Math.PI - rad);
    state.left += state.direction * delta * Math.sin(rad);

    if (
      (state.top - q.top) * (p.top - q.top) < 0 &&
      (state.left - q.left) * (p.left - q.left) < 0
    ) {
      state.top = q.top;
      state.left = q.left;
      state.direction = -1;
    } else if (
      (state.top - p.top) * (q.top - p.top) < 0 &&
      (state.left - p.left) * (q.left - p.left) < 0
    ) {
      state.top = p.top;
      state.left = p.left;
      state.direction = 1;
    }
  };

  let timer = 0;
  onMounted(() => {
    timer = setInterval(update, 1000 / FRAME);
  });
  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    p,
    q,
    style: computed<CSSProperties>(() => ({
      position: "absolute",
      top: `${state.top}px`,
      left: `${state.left}px`,
      transform: options.rotate90deg
        ? `rotateZ(${rad + Math.PI / 2}rad)`
        : `rotateZ(${rad}rad)`,
    })),
  };
};

export const useGameObjectImage = (type: GameObjectType) => {
  const [src, [width, height]] = ((): [string, [number, number]] => {
    const resize = ([width, height]: readonly [number, number]): [
      number,
      number
    ] => [(width / height) * OBJECT_HEIGHT, OBJECT_HEIGHT];

    switch (type) {
      case "kani":
      case "kanimodoki":
        return [srcKani, resize(IMAGE_SIZE.KANI)];
      case "rabbit":
        return [srcRabbit, resize(IMAGE_SIZE.RABBIT)];
      case "lop":
        return [srcLop, resize(IMAGE_SIZE.LOP)];
    }
  })();

  return {
    src,
    width,
    height,
    style: computed<CSSProperties>(() => ({
      width: `${width}px`,
      height: `${height}px`,
    })),
  };
};

export const preloadImages = () => {
  const tasks = [srcKani, srcLop, srcRabbit, srcSagi].map(
    (src) =>
      new Promise((resolve) => {
        const img = new Image();

        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      })
  );

  return Promise.all(tasks);
};

const getSceneViewport = (() => {
  let sceneWidth = 0;
  let sceneHeight = 0;

  return () => {
    if (!sceneWidth || !sceneHeight) {
      const el = document.getElementById("scene");
      sceneWidth = el?.clientWidth || 0;
      sceneHeight = el?.clientHeight || 0;
    }

    return { sceneWidth, sceneHeight };
  };
})();
