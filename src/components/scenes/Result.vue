<script setup lang="ts">
import { computed } from "@vue/reactivity";
import Button from "../Button.vue";
import { state, score, goScene } from "../../lib/game";
import srcRabbit from "../../assets/rabbit.png";
import srcLop from "../../assets/lop.png";
import srcKani from "../../assets/kani.png";

const tweet = () => {
  const text = `あけましておめでとうございます！にせうさぎ退治で ${score.value} 点獲得したよ！`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURI(text)}&url=${encodeURI(
      window.location.href
    )}`
  );
};

const gameoverReason = computed(() => {
  switch (state.gameoverReason) {
    case "tap-kani":
      return "カニを退治してしまった！\n(カニは、うさぎです。)\n(フィンランド語でうさぎは KANI なので。)";
    case "tap-lop":
      return "ホーランドロップを退治してしまった！\n(ホーランドロップは、うさぎです。)";
    case "tap-rabbit":
      return "ネザーランドドワーフを退治してしまった！\n(ネザーランドドワーフは、うさぎです。)";
    case "timeover":
      return "時間切れだ！";
  }
});

const thumbnail = computed(() => {
  switch (state.gameoverReason) {
    case "tap-kani":
      return srcKani;
    case "tap-lop":
      return srcLop;
    case "tap-rabbit":
      return srcRabbit;
    default:
      return null;
  }
});
</script>

<template>
  <div class="result outgame">
    <h1 class="header">謹賀新年</h1>

    <img v-if="thumbnail" :src="thumbnail" width="60" alt="" />
    <div class="gameover-reason">{{ gameoverReason }}</div>

    <div class="score">スコア: {{ score }}</div>

    <table class="score-detail">
      <tr v-if="state.scoreSource.kanimodoki > 0">
        <th scope="row">カニもどき</th>
        <td>{{ state.scoreSource.kanimodoki }}</td>
      </tr>
      <tr v-if="state.scoreSource.sagi > 0">
        <th scope="row">サギ</th>
        <td>{{ state.scoreSource.sagi }}</td>
      </tr>
      <tr v-if="state.scoreSource.sagiTimer > 0">
        <th scope="row">サギタイマーUI</th>
        <td>{{ state.scoreSource.sagiTimer }}</td>
      </tr>
      <tr v-if="state.scoreSource.sagiSweep > 0">
        <th scope="row">詐欺退治</th>
        <td>{{ state.scoreSource.sagiSweep }}</td>
      </tr>
      <tr v-if="state.scoreSource.scoreview > 0">
        <th scope="row">スコアUI</th>
        <td>{{ state.scoreSource.scoreview }}</td>
      </tr>
      <tr v-if="state.scoreSource.timer > 0">
        <th scope="row">残り時間UI</th>
        <td>{{ state.scoreSource.timer }}</td>
      </tr>
    </table>

    <div class="buttons">
      <Button @click="goScene('game')">リトライ</Button>
      <Button @click="tweet">結果をツイート</Button>
      <Button @click="goScene('start')">タイトルに戻る</Button>
    </div>
  </div>
</template>

<style scoped>
.result {
  overflow-y: auto;
}

.header {
  font-size: 26px;
  margin: 30px 0;
}

.gameover-reason {
  white-space: pre-line;
}

.score {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
}

.score-detail {
  margin: 20px auto;
}

.score-detail th,
.score-detail td {
  text-align: left;
}

.score-detail th {
  padding: 3px 10px;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
}
</style>
