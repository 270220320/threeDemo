<script setup>
import { onMounted } from "vue";
import * as THREE from "three";

const initThree = () => {};

const addEvent = () => {
  const scene = new THREE.Scene();
  // 圆柱
  const geometry = new THREE.CylinderGeometry(30, 30, 60);
  // 涂料
  const material = new THREE.MeshBasicMaterial({
    color: "grey",
  });
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  });
  const material3 = new THREE.MeshBasicMaterial({
    color: "green", //0xff0000设置材质颜色为红色
  });
  // 结构
  const mesh = new THREE.Mesh(geometry, [material, material2, material3]);
  mesh.position.set(30, 30, 30);
  scene.add(mesh);

  const width = 500; //宽度
  const height = 300; //高度
  // 相机
  const camera = new THREE.PerspectiveCamera(20, width / height, 10, 3000);
  camera.position.set(200, 200, 200);
  camera.lookAt(30, 30, 30);
  // 渲染
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  document.getElementById("three").appendChild(renderer.domElement);
  document.addEventListener(
    "click",
    (event) => {
      // 坐标系
      const vector3 = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      const vector = vector3.unproject(camera);
      // 射线
      const raycaster = new THREE.Raycaster(
        camera.position,
        vector.sub(camera.position).normalize()
      );
      debugger;
      const intersects = raycaster.intersectObjects([mesh], false);
      if (intersects.length > 0) {
        // 处理点击事件
        // intersects[0] 包含了第一个交点
        const clickedObject = intersects[0].object;

        console.log("获取的当前模型信息:", clickedObject);
        alert(clickedObject.name);
      }
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
