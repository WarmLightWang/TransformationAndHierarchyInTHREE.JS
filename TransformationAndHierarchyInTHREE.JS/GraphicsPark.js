/*jshint esversion: 6 */

/**
 * This program does a Graphics Park - animate some hierarchical objects in 3D and figure out the framework code.
 */

// get things we need
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import {
  GrSimpleSwing,
  GrColoredRoundabout,
  GrSimpleRoundabout,
  GrAdvancedSwing,
  GrCarousel,
  GrSwivelchair
} from "./Parkobjects.js";
import { SimpleBouncer } from "./Simplepark.js";

function test() {
  let parkDiv = document.getElementById("div1");
  let world = new GrWorld({ groundplanesize: 20, where: parkDiv });

  //world.add(new SimpleBouncer(0, 5));

  let roundabout = new GrSimpleRoundabout({ x: 2, z: 1 });
  world.add(roundabout);

  let roundabout_2 = new GrColoredRoundabout({ x: 9, z: -9 });
  world.add(roundabout_2);

  let swing_2 = new GrSimpleSwing({ x: 16 });
  world.add(swing_2);

  let swing = new GrAdvancedSwing({ x: 12, z: 6, size: 1.5 });
  world.add(swing);

  let swing1 = new GrAdvancedSwing({ x: 8, z: 12, size: 1 });
  world.add(swing1);

  let carousel = new GrCarousel({ x: -11, z: -11, size: 2.5 });
  world.add(carousel);

  let swivelChair = new GrSwivelchair({ x: -7, z: 10, size: 2 });
  world.add(swivelChair);

  function loop() {
    world.animate();
    window.requestAnimationFrame(loop);
  }
  loop();
}
window.onload = test;
