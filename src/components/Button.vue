<template>
  <button><slot /></button>
</template>

<style scoped>
button {
  border-radius: 8px;
  background-color: antiquewhite;
  border: none;
  cursor: pointer;
  outline: 1px solid gray;
  padding: 5px 10px;
  appearance: none;
}

button:hover {
  background-color: aliceblue;
}

button:active {
  background-color: antiquewhite;
}
</style>
