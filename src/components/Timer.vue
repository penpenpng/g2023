<script setup lang="ts">
import { state } from "../lib/game";
import { SCORE } from "../lib/consts";
import { useTapHandler } from "../lib/tapevent";

const onTapped = useTapHandler(() => {
  state.scoreSource.timer += SCORE.TIMER;
});
</script>

<template>
  <div
    v-if="state.scoreSource.timer <= 0"
    class="timer"
    @mousedown="onTapped"
    @touchstart="onTapped"
  >
    残り時間: {{ state.timeRemaining }}
  </div>
</template>

<style scoped>
.timer {
  text-align: left;
  padding: 2px 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
