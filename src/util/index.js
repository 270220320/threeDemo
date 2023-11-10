import * as THREE from "three";

export default class ThreeDimensions {
  constructor(domId) {
    // 场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#ffffff");
    // 圆柱
    const geometry = new THREE.CylinderGeometry(20, 20, 40);
    // 涂料
    const material = new THREE.MeshBasicMaterial({
      color: "yellow",
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: "red",
    });
    const material3 = new THREE.MeshBasicMaterial({
      color: "green",
    });
    // 结构
    const mesh = new THREE.Mesh(geometry, [material, material2, material3]);
    mesh.position.set(0, 0, 0);
    this.scene.add(mesh);

    const width = 300; //宽度
    const height = 300; //高度
    // 相机
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    this.camera.position.set(0, 50, 100);
    this.camera.lookAt(0, 0, 0);
    // 渲染
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.render(this.scene, this.camera);
    this.threeDom = document.getElementById(domId);
    this.threeDom.appendChild(this.renderer.domElement);
  }
  camera;
  scene;
  threeDom;
  renderer;
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
export const getEventElement = (event, three) => {
  const vector3 = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  // 转换3D坐标
  // const vector = vector3.unproject(three.camera);
  // 射线
  const raycaster = new THREE.Raycaster();
  // three.camera.position,
  // vector.sub(three.camera.position).normalize() // 归一化
  raycaster.setFromCamera(vector3, three.camera);
  const intersects = raycaster.intersectObjects(
    [...three.scene.children],
    false
  );
  if (intersects.length > 0) {
    // 处理点击事件
    // intersects[0] 包含了第一个交点
    const clickedObject = intersects[0].object;
    console.log("获取的当前模型信息:", clickedObject);
    return clickedObject;
  }
};
