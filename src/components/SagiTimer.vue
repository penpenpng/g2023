<script setup lang="ts">
import { score, state } from "../lib/game";
import { SCORE } from "../lib/consts";
import { useTapHandler } from "../lib/tapevent";

const onTapped = useTapHandler(() => {
  state.scoreSource.sagiTimer += SCORE.SAGI_TIMER;
});
</script>

<template>
  <div
    v-if="state.scoreSource.sagiTimer <= 0 && state.timeSagiRemaining > 0"
    class="score"
    @mousedown="onTapped"
    @touchstart="onTapped"
  >
    💃サギタイム！！！💃<br />
    {{ state.timeSagiRemaining }}
  </div>
</template>

<style scoped>
.score {
  padding: 5px 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
