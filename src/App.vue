<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { getEventElement } from "./util";
import ThreeDimensions from "./util";

let three;
const initThree = () => {
  three = new ThreeDimensions("three");
};
let target;
let start = {};
const mouseMove = (event) => {
  if (target) {
    target.rotation.z = start.rotationX + (event.clientX - start.x) * 0.05;
    target.rotation.x = start.rotationY + (event.clientY - start.y) * 0.05;
    three.render();
  }
};
const mouseUp = () => {
  target = undefined;
};
const addEvent = () => {
  document.getElementById("three").addEventListener(
    "mousedown",
    (event) => {
      target = getEventElement(event, three);
      start.x = event.clientX;
      start.y = event.clientY;
      start.rotationX = target.rotation.x;
      start.rotationY = target.rotation.y;
    },
    false
  );
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
};

onMounted(() => {
  initThree();
  addEvent();
});
onBeforeUnmount(() => {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
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
