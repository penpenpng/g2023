import { ref } from "vue";

export const useTapHandler = (callback: () => void) => {
  const hasTapped = ref(false);

  return () => {
    if (hasTapped.value) {
      return;
    }

    hasTapped.value = true;
    callback();
  };
};
