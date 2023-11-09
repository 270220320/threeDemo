<script setup>
import { onMounted } from "vue";
import { getEventElement } from "./util";
import ThreeDimensions from "./util";

let three;
const initThree = () => {
  three = new ThreeDimensions("three");
};

const addEvent = () => {
  document.getElementById("three").addEventListener(
    "click",
    (event) => {
      // NDC坐标系下位置
      const obj = getEventElement(event, three);
    },
    false
  );
};

onMounted(() => {
  initThree();
  addEvent();
});
</script>

<template>
  <div id="three"></div>
</template>

<style scoped>
#three {
  width: 500px;
  height: 300px;
}
</style>
