<script setup lang="ts">
import StartScene from "./components/scenes/Start.vue";
import GameScene from "./components/scenes/Game.vue";
import ResultScene from "./components/scenes/Result.vue";
import { state } from "./lib/game";

const SCENE = {
  start: StartScene,
  game: GameScene,
  result: ResultScene,
} as const;
</script>

<template>
  <div id="scene">
    <component :is="SCENE[state.scene]" />
  </div>
</template>

<style scoped>
#scene {
  width: 360px;
  height: 600px;
  border: 1px solid;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
img {
  user-select: none;
}
.outgame {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
