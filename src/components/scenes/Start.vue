<script setup lang="ts">
import Button from "../Button.vue";
import { goScene } from "../../lib/game";
import { volumeGain } from "../../lib/audio";
</script>

<template>
  <div class="outgame">
    <h1 class="title">にせうさぎ退治</h1>
    <div class="block">
      今年の干支はうさぎなので、<br />うさぎではないものを退治しよう！
    </div>

    <div class="block">
      <label for="volume" class="block"
        >音量
        <input
          v-model="volumeGain"
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
        />
      </label>
    </div>

    <div class="block">
      <Button @click="goScene('game')">ゲームスタート</Button>
    </div>

    <div class="block">
      <div>画像: いらすとや</div>
      <div>BGM・SE: 魔王魂</div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 26px;
  margin: 30px 0;
}
.block {
  display: block;
  margin: 30px 20px;
}
</style>
