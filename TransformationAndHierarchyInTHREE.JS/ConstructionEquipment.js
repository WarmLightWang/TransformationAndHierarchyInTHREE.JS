/*jshint esversion: 6 */

/**
 * This program does the Construction Equipment - use the framework code and make a different kind of hierarchical object.
 */

// get things we need
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
import { GrCrane, GrExcavator, GrLoader, GrDumptruck } from "./Constructionobjects.js";

function startWorld() {
  let cDiv = document.getElementById("construction");
  let world = new GrWorld({ groundplanesize: 10, where: cDiv });

  let crane = new GrCrane({ x: 2, z: -2 });
  world.add(crane);
  let c_ui = new AutoUI(crane, 300, cDiv);
  c_ui.set("x", 2);
  c_ui.set("z", -2);
  c_ui.set("theta", 36);

  let excavator = new GrExcavator({ x: -2, z: 2 });
  world.add(excavator);
  let e_ui = new AutoUI(excavator, 300, cDiv);
  e_ui.set("x", 6);
  e_ui.set("z", 4);
  e_ui.set("theta", 36);

  let loader = new GrLoader({ x: -5, z: 7 });
  world.add(loader);
  let l_ui = new AutoUI(loader, 300, cDiv);
  l_ui.set("x", -1);
  l_ui.set("z", 5);
  l_ui.set("theta", 240);

  let dumptruck = new GrDumptruck({ x: 5, z: -7 });
  world.add(dumptruck);
  let d_ui = new AutoUI(dumptruck, 300, cDiv);
  d_ui.set("x", -6);
  d_ui.set("z", -2);
  d_ui.set("theta", 308);

  function loop() {
    world.animate();
    window.requestAnimationFrame(loop);
  }
  loop();
}
window.onload = startWorld;
