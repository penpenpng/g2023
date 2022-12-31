import { ref } from "vue";
import maou_bgm_8bit29 from "../assets/maou_bgm_8bit29.mp3";
import maou_se_system40 from "../assets/maou_se_system40.mp3";

interface AudioInfo {
  url: string;
  volume: number;
  loop?: boolean;
  skip?: number;
}

interface LoadedAudio {
  audio: HTMLAudioElement;
  info: AudioInfo;
}

const loadAudio = (info: AudioInfo) =>
  new Promise<LoadedAudio>((resolve) => {
    const audio = new Audio(info.url);

    audio.onloadedmetadata = () => {
      resolve({ audio, info });
    };
    audio.onerror = () => {
      console.warn(`Failed to load ${info.url}.`);
      resolve({ audio: new Audio(), info });
    };
  });

export const AUDIOS = {
  BGM: loadAudio({ url: maou_bgm_8bit29, volume: 0.2, loop: true, skip: 0.5 }),
  GAIN: loadAudio({ url: maou_se_system40, volume: 1 }),
} satisfies Record<string, Promise<LoadedAudio>>;

export const playAudio = async (loadedAudio: Promise<LoadedAudio>) => {
  const { audio, info } = await loadedAudio;

  audio.volume = volumeGain.value * info.volume;
  audio.currentTime = info.skip || 0;
  audio.loop = !!info.loop;
  await audio.play();
};

export const stopAudio = async (loadedAudio: Promise<LoadedAudio>) => {
  const { audio } = await loadedAudio;
  audio.pause();
};

export const volumeGain = ref(1);
