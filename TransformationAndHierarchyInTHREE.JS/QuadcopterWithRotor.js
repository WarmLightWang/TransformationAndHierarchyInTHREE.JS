/*jshint esversion: 6 */

/**
 * This program crates the rotor to track the Quadcopter / Aircraft. It’s a hierarchical model 
 * and will use a “lookat” transformation.
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { OrbitControls } from "../libs/CS559-THREE/examples/jsm/controls/OrbitControls.js";
import { onWindowOnload } from "../libs/CS559-Libs/helpers.js";

function quadcopter() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(600, 400);
  document.body.appendChild(renderer.domElement);

  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera(
    40,
    renderer.domElement.width / renderer.domElement.height,
    1,
    1000
  );

  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 0, 0);

  // since we're animating, add OrbitControls
  let controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new T.AmbientLight("white", 0.2));

  // two lights - both a little off white to give some contrast
  let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
  dirLight1.position.set(1, 1, 0);
  scene.add(dirLight1);

  let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
  dirLight2.position.set(-1, 1, -0.2);
  scene.add(dirLight2);

  // make a ground plane
  let groundBox = new T.BoxGeometry(10, 0.1, 10);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  // draw the first propeller spins
  let arm1 = new T.BoxBufferGeometry(8, 0, 0);
  let a1 = new T.MeshStandardMaterial({ color: "lightblue" });
  let arm1Mesh = new T.Mesh(arm1, a1);
  arm1Mesh.position.setY(4);
  arm1Mesh.translateX(11);
  arm1Mesh.rotateY(0.5);
  scene.add(arm1Mesh);

  let spin1 = new T.BoxBufferGeometry(6, 0, 0);
  let s1 = new T.MeshStandardMaterial({ color: "green" });
  let spin1Mesh = new T.Mesh(spin1, s1);
  spin1Mesh.translateX(3);
  spin1Mesh.translateY(-1);
  spin1Mesh.rotateY(1);
  arm1Mesh.add(spin1Mesh);
  scene.add(arm1Mesh);

  // draw the second propeller spins
  let arm2 = new T.BoxBufferGeometry(8, 0, 0);
  let a2 = new T.MeshStandardMaterial({ color: "lightblue" });
  let arm2Mesh = new T.Mesh(arm2, a2);
  arm2Mesh.position.setY(4);
  arm2Mesh.translateX(1);
  arm2Mesh.rotateY(-0.5);
  scene.add(arm2Mesh);

  let spin2 = new T.BoxBufferGeometry(6, 0, 0);
  let s2 = new T.MeshStandardMaterial({ color: "green" });
  let spin2Mesh = new T.Mesh(spin2, s2);
  spin2Mesh.translateX(-3);
  spin2Mesh.translateY(-1);
  spin2Mesh.rotateY(1);
  arm2Mesh.add(spin2Mesh);
  scene.add(arm2Mesh);

  // draw the third propeller spins
  let arm3 = new T.BoxBufferGeometry(8, 0, 0);
  let a3 = new T.MeshStandardMaterial({ color: "lightblue" });
  let arm3Mesh = new T.Mesh(arm3, a3);
  arm3Mesh.position.setY(4);
  arm3Mesh.translateX(11);
  arm3Mesh.translateZ(11);
  arm3Mesh.rotateY(-0.5);
  scene.add(arm3Mesh);

  let spin3 = new T.BoxBufferGeometry(6, 0, 0);
  let s3 = new T.MeshStandardMaterial({ color: "green" });
  let spin3Mesh = new T.Mesh(spin3, s3);
  spin3Mesh.translateX(3);
  spin3Mesh.translateY(-1);
  spin3Mesh.rotateY(1);
  arm3Mesh.add(spin3Mesh);
  scene.add(arm3Mesh);

  // draw the fourth propeller spins
  let arm4 = new T.BoxBufferGeometry(8, 0, 0);
  let a4 = new T.MeshStandardMaterial({ color: "lightblue" });
  let arm4Mesh = new T.Mesh(arm4, a4);
  arm4Mesh.position.setY(4);
  arm4Mesh.translateX(1);
  arm4Mesh.translateZ(11);
  arm4Mesh.rotateY(0.5);
  scene.add(arm4Mesh);

  let spin4 = new T.BoxBufferGeometry(6, 0, 0);
  let s4 = new T.MeshStandardMaterial({ color: "green" });
  let spin4Mesh = new T.Mesh(spin4, s4);
  spin4Mesh.translateX(-3);
  spin4Mesh.translateY(-1);
  spin4Mesh.rotateY(1);
  arm4Mesh.add(spin4Mesh);
  scene.add(arm4Mesh);


  // Draw the body of first aircraft
  let shape = new T.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 8);
  shape.lineTo(12, 8);
  shape.lineTo(12, 0);
  shape.lineTo(0, 0);
  let extrude = {
    steps: 1,
    depth: 12,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: -4,
    bevelSegments: 1
  };
  let body1 = new T.ExtrudeBufferGeometry(shape, extrude);
  let m1 = new T.MeshStandardMaterial({ color: "lightblue" });
  let bodyMesh = new T.Mesh(body1, m1);
  bodyMesh.scale.set(0.1, 0.1, 0.1);
  bodyMesh.position.y = 1.5;
  bodyMesh.add(arm1Mesh);
  scene.add(bodyMesh);
  bodyMesh.add(arm2Mesh);
  scene.add(bodyMesh);
  bodyMesh.add(arm3Mesh);
  scene.add(bodyMesh);
  bodyMesh.add(arm4Mesh);
  scene.add(bodyMesh);

  // draw the radar rays
  let ray1G = new T.CylinderBufferGeometry(0.02, 0.02, 3, 6);
  let ray1M = new T.MeshStandardMaterial({ color: "red" });
  let ray1 = new T.Mesh(ray1G, ray1M);
  ray1.position.setY(-1.5);
  scene.add(ray1);

  let ray2G = new T.CylinderBufferGeometry(0.02, 0.02, 6, 6);
  let ray2M = new T.MeshStandardMaterial({ color: "red" });
  let ray2 = new T.Mesh(ray2G, ray2M);
  ray2.position.setY(-2.2);
  scene.add(ray2);

  // crate the first radar dish
  let radar1 = new T.ConeBufferGeometry(0.6, 1, 50);
  let r1 = new T.MeshStandardMaterial({ color: "lightblue" });
  let radar1Mesh = new T.Mesh(radar1, r1);
  radar1Mesh.position.setY(0.3);
  radar1Mesh.rotateY(44);
  scene.add(radar1Mesh);
  radar1Mesh.add(ray1);
  scene.add(radar1Mesh);

  // crate the second radar dish
  let radar2 = new T.SphereBufferGeometry(1, 32, 32, 0, 10, 0, 1);
  let r2 = new T.MeshStandardMaterial({ color: "gray" });
  let radar2Mesh = new T.Mesh(radar2, r2);
  radar2Mesh.scale.set(0.6, 1.2, 0.6);
  radar2Mesh.position.setY(0.8);
  radar2Mesh.translateX(3.8);
  radar2Mesh.translateZ(4);
  radar2Mesh.rotateZ(-2);
  radar2Mesh.rotateX(0.5);
  scene.add(radar2Mesh);
  radar2Mesh.add(ray2);
  scene.add(radar2Mesh);

  // draw the top propeller spins
  let topSpin = new T.BoxBufferGeometry(12, 2, 2);
  let topS = new T.MeshStandardMaterial({ color: "green" });
  let onTop = new T.Mesh(topSpin, topS);
  onTop.position.setZ(-3);
  onTop.translateX(0);
  onTop.translateY(0);
  scene.add(onTop);

  let topArm = new T.BoxBufferGeometry(2, 2, 5, 8);
  let topA = new T.MeshStandardMaterial({ color: "gray" });
  let topMesh = new T.Mesh(topArm, topA);
  topMesh.scale.set(0.1, 0.1, 0.1);
  topMesh.position.setY(1.1);
  topMesh.position.setZ(0.1);
  topMesh.position.setX(0.1);
  topMesh.rotateX(Math.PI / 2);
  topMesh.add(onTop);
  scene.add(topMesh);

  // draw the back propeller spins
  let backSpin = new T.BoxBufferGeometry(12, 2, 2);
  let backS = new T.MeshStandardMaterial({ color: "green" });
  let back = new T.Mesh(backSpin, backS);
  back.position.setZ(5);
  back.translateX(0);
  back.translateY(0);
  scene.add(back);

  let backArm = new T.BoxBufferGeometry(2, 2, 8, 8);
  let backA = new T.MeshStandardMaterial({ color: "gray" });
  let backMesh = new T.Mesh(backArm, backA);
  backMesh.scale.set(0.1, 0.1, 0.1);
  backMesh.position.setY(0);
  backMesh.translateX(1.2);
  backMesh.translateZ(0.5);
  backMesh.rotateY(1.2);
  backMesh.add(back);
  scene.add(backMesh);

  // Draw the front glass of second aircraft
  let front = new T.SphereBufferGeometry(1, 32, 32, 0, 10, 0, 1);
  let fg = new T.MeshStandardMaterial({ color: "green" });
  let frontMesh = new T.Mesh(front, fg);
  frontMesh.scale.set(0.8, 1.2, 0.8);
  frontMesh.position.y = 0.23;
  frontMesh.translateX(0.2);
  frontMesh.translateZ(0.1);
  frontMesh.rotateX(2);
  frontMesh.rotateZ(-4.3);
  scene.add(frontMesh);

  // Draw the body of second aircraft
  let body2 = new T.SphereBufferGeometry(1, 32, 32);
  let m2 = new T.MeshStandardMaterial({ color: "gray" });
  let body2Mesh = new T.Mesh(body2, m2);
  body2Mesh.scale.set(1, 0.6, 1);
  body2Mesh.position.y = 2.5;
  body2Mesh.rotateY(-2);
  body2Mesh.add(topMesh);
  scene.add(body2Mesh);
  body2Mesh.add(backMesh);
  scene.add(body2Mesh);
  body2Mesh.add(frontMesh);
  scene.add(body2Mesh);

  function animateLoop() {
    // move in a circle of the first aircraft
    let theta = performance.now() / 1000;
    let x = 2 * Math.cos(theta);
    let z = 2 * Math.sin(theta);
    bodyMesh.position.x = x;
    bodyMesh.position.z = z;
    bodyMesh.lookAt(x - 2 * Math.sin(theta), 1.5, z + 2 * Math.cos(theta));
    spin1Mesh.rotateY(0.5);
    spin2Mesh.rotateY(0.5);
    spin3Mesh.rotateY(0.5);
    spin4Mesh.rotateY(0.5);
    radar1Mesh.lookAt(bodyMesh.position);
    radar1Mesh.rotateX(Math.PI / 2);
    radar1Mesh.rotateZ(-Math.PI / 1.06);

    // the motion of the second aircraft
    let x2 = -3 * Math.cos(theta);
    let z2 = 3 * Math.cos(theta);
    let y2 = 2 + 1 * Math.cos(theta);
    body2Mesh.position.x = x2;
    body2Mesh.position.z = z2;
    body2Mesh.position.y = y2;
    body2Mesh.lookAt(x2 - 3 * Math.sin(theta), 3, z2 + 3 * Math.cos(theta));
    onTop.rotateZ(0.5);
    back.rotateZ(0.5);
    radar2Mesh.lookAt(body2Mesh.position);
    radar2Mesh.rotateX(Math.PI / 2);
    radar2Mesh.rotateZ(Math.PI);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
  animateLoop();
}
onWindowOnload(quadcopter);
