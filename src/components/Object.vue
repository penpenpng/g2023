<script setup lang="ts">
import { PropType, computed, CSSProperties } from "vue";
import { type GameObject, destroy } from "../lib/game";
import { useRoundTripBehavior, useGameObjectImage } from "../lib/object";
import { useTapHandler } from "../lib/tapevent";

const props = defineProps({
  object: {
    type: Object as PropType<GameObject>,
    required: true,
  },
});
const type = props.object.type;

const onTapped = useTapHandler(() => {
  destroy(props.object);
});

const trip = useRoundTripBehavior({
  rotate90deg: type === "kani",
});
const image = useGameObjectImage(type);

const style = computed(
  (): CSSProperties => ({
    ...trip.style.value,
    ...image.style.value,
    "z-index": type === "kanimodoki" ? 1000 : 100,
  })
);
</script>

<template>
  <img
    :src="image.src"
    :width="image.width"
    :height="image.height"
    :style="style"
    alt=""
    class="game-object"
    @touchstart="onTapped"
    @mousedown="onTapped"
  />
</template>

<style scoped>
.game-object {
  cursor: pointer;
}

.game-object:hover {
  outline: solid 1px;
}
</style>
