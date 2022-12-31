export const FRAME = 30;
export const INITIAL_TIME_REMAINING = 20;
export const INITIAL_SPAWN = 30;
export const SAGI_TIME = 5;
export const OBJECT_HEIGHT = 60;
export const OBJECT_MIN_PX_PER_SEC = 50;
export const OBJECT_MAX_PX_PER_SEC = 200;
export const SAGI_HEIGHT = 60;
export const IMAGE_SIZE = {
  KANI: [400, 315],
  RABBIT: [400, 400],
  LOP: [180, 180],
  SAGI: [362, 400],
} as const;
export const SCORE = {
  KANIMODOKI: 100,
  SAGI: 300,
  SAGI_TIMER: 300,
  SAGI_SWEEP: 10,
  SCORE_VIEW: 100,
  TIMER: 300,
} as const;
export const POP_TABLE = [
  [30, "kani"],
  [30, "kanimodoki"],
  [30, "rabbit"],
  [10, "lop"],
] as const;
