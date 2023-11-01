<script setup>
import { onMounted } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import * as THREE from "three";

onMounted(() => {
  const scene = new THREE.Scene();
  const geometry = new THREE.CylinderGeometry(30, 30, 60);
  const material = new THREE.MeshBasicMaterial({
    color: "grey",
  });
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  });
  const mesh = new THREE.Mesh(geometry, [material, material2]);
  mesh.position.set(30, 30, 30);
  scene.add(mesh);

  const width = 500; //宽度
  const height = 300; //高度
  const camera = new THREE.PerspectiveCamera(20, width / height, 10, 3000);
  camera.position.set(200, 200, 200);
  camera.lookAt(30, 30, 30);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  document.getElementById("three").appendChild(renderer.domElement);
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
