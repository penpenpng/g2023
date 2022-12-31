<script setup lang="ts">
import GameObject from "../Object.vue";
import Score from "../Score.vue";
import Timer from "../Timer.vue";
import Sagi from "../Sagi.vue";
import SagiTimer from "../SagiTimer.vue";
import { state, useSetupGame } from "../../lib/game";

useSetupGame();
</script>

<template>
  <div class="game">
    <div class="ui-head">
      <Score />
      <Timer />
    </div>
    <div class="objects">
      <GameObject v-for="obj in state.objects" :key="obj.id" :object="obj" />
    </div>
    <div class="ui-foot">
      <Sagi />
      <SagiTimer />
    </div>
  </div>
</template>

<style scoped>
.game {
  position: relative;
  width: 100%;
  height: 100%;
}

.ui-head {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  z-index: 10000;
}

.ui-foot {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  z-index: 10000;
  text-align: center;
}

.objects {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
}
</style>
