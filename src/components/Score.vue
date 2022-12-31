<script setup lang="ts">
import { score, state } from "../lib/game";
import { SCORE } from "../lib/consts";
import { useTapHandler } from "../lib/tapevent";

const onTapped = useTapHandler(() => {
  state.scoreSource.scoreview += SCORE.SCORE_VIEW;
});
</script>

<template>
  <div
    v-if="state.scoreSource.scoreview <= 0"
    class="score"
    @mousedown="onTapped"
    @touchstart="onTapped"
  >
    すこあ: {{ score }}
  </div>
</template>

<style scoped>
.score {
  text-align: left;
  padding: 2px 20px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
