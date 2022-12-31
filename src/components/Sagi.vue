<script setup lang="ts">
import { state } from "../lib/game";
import { SCORE, SAGI_TIME, IMAGE_SIZE, SAGI_HEIGHT } from "../lib/consts";
import { useTapHandler } from "../lib/tapevent";
import src from "../assets/sagi.png";

const onTapped = useTapHandler(() => {
  state.scoreSource.sagi += SCORE.SAGI;
  state.timeSagiRemaining = SAGI_TIME;
});

const [_width, _height] = IMAGE_SIZE.SAGI;
const [width, height] = [(_width * SAGI_HEIGHT) / _height, SAGI_HEIGHT];
</script>

<template>
  <img
    v-if="state.scoreSource.sagi <= 0"
    :src="src"
    :width="width"
    :height="height"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      cursor: 'pointer',
    }"
    alt=""
    @mousedown="onTapped"
    @touchstart="onTapped"
  />
</template>

<style scoped></style>
