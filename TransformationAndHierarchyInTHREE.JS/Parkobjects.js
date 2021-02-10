/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Scene } from "../libs/CS559-THREE/build/three.module.js";

let simpleRoundaboutObCtr = 0;
// A simple merry-go-round.
/**
 * @typedef SimpleRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleRoundabout extends GrObject {
  /**
   * @param {SimpleRoundaboutProperties} params
   */
  constructor(params = {}) {
    let simpleRoundabout = new T.Group();

    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    simpleRoundabout.add(base);

    let platform_geom = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4);
    let platform_mat = new T.MeshStandardMaterial({
      color: "blue",
      metalness: 0.3,
      roughness: 0.6
    });

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleRoundabout-${simpleRoundaboutObCtr++}`, simpleRoundabout);
    this.whole_ob = simpleRoundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    simpleRoundabout.scale.set(scale, scale, scale);

    this.tick = function (delta, timeOfDay) {
      this.platform.rotateY(0.005 * delta);
    };
  }
}

let roundaboutObCtr = 0;
// A colorful merry-go-round, with handles and differently-colored sections.
/**
 * @typedef ColoredRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrColoredRoundabout extends GrObject {
  /**
   * @param {ColoredRoundaboutProperties} params
   */
  constructor(params = {}) {
    let roundabout = new T.Group();

    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    roundabout.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);

    let section_geom = new T.CylinderGeometry(
      2,
      1.8,
      0.3,
      8,
      4,
      false,
      0,
      Math.PI / 2
    );
    let section_mat;
    let section;

    let handle_geom = buildHandle();
    let handle_mat = new T.MeshStandardMaterial({
      color: "#999999",
      metalness: 0.8,
      roughness: 0.2
    });
    let handle;

    // in the loop below, we add four differently-colored sections, with handles,
    // all as part of the platform group.
    let section_colors = ["red", "blue", "yellow", "green"];
    for (let i = 0; i < section_colors.length; i++) {
      section_mat = new T.MeshStandardMaterial({
        color: section_colors[i],
        metalness: 0.3,
        roughness: 0.6
      });
      section = new T.Mesh(section_geom, section_mat);
      handle = new T.Mesh(handle_geom, handle_mat);
      section.add(handle);
      handle.rotation.set(0, Math.PI / 4, 0);
      handle.translateZ(1.5);
      platform_group.add(section);
      section.rotateY((i * Math.PI) / 2);
    }

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Roundabout-${roundaboutObCtr++}`, roundabout);
    this.whole_ob = roundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    roundabout.scale.set(scale, scale, scale);

    this.tick = function (delta, timeOfDay) {
      this.platform.rotateY(0.005 * delta);
    };

    // This helper function defines a curve for the merry-go-round's handles,
    // then extrudes a tube along the curve to make the actual handle geometry.
    function buildHandle() {
      /**@type THREE.CurvePath */
      let handle_curve = new T.CurvePath();
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0))
      );
      handle_curve.add(
        new T.CubicBezierCurve3(
          new T.Vector3(-0.5, 0.8, 0),
          new T.Vector3(-0.5, 1, 0),
          new T.Vector3(0.5, 1, 0),
          new T.Vector3(0.5, 0.8, 0)
        )
      );
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0))
      );
      return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
    }
  }
}

let simpleSwingObCtr = 0;

// A basic, one-seat swingset.
/**
 * @typedef SimpleSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleSwing extends GrObject {
  /**
   * @param {SimpleSwingProperties} params
   */
  constructor(params = {}) {
    let simpleSwing = new T.Group();
    addPosts(simpleSwing);

    // Here, we create a "hanger" group, which the swing chains will hang from.
    // The "chains" for the simple swing are just a couple thin cylinders.
    let hanger = new T.Group();
    simpleSwing.add(hanger);
    hanger.translateY(1.8);
    let chain_geom = new T.CylinderGeometry(0.05, 0.05, 1.4);
    let chain_mat = new T.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.8,
      roughness: 0.2
    });
    let l_chain = new T.Mesh(chain_geom, chain_mat);
    let r_chain = new T.Mesh(chain_geom, chain_mat);
    hanger.add(l_chain);
    hanger.add(r_chain);
    l_chain.translateY(-0.75);
    l_chain.translateZ(0.4);
    r_chain.translateY(-0.75);
    r_chain.translateZ(-0.4);

    let seat_group = new T.Group();
    let seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
    let seat_mat = new T.MeshStandardMaterial({
      color: "#554433",
      metalness: 0.1,
      roughness: 0.6
    });
    let seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleSwing-${simpleSwingObCtr++}`, simpleSwing);
    this.whole_ob = simpleSwing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    simpleSwing.scale.set(scale, scale, scale);

    this.swing_max_rotation = Math.PI / 4;
    this.swing_direction = 1;
    this.tick = function (delta, timeOfDay) {
      // if we swing too far forward or too far backward, switch directions.
      if (this.hanger.rotation.z >= this.swing_max_rotation)
        this.swing_direction = -1;
      else if (this.hanger.rotation.z <= -this.swing_max_rotation)
        this.swing_direction = 1;
      this.hanger.rotation.z += this.swing_direction * 0.003 * delta;
    };

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      let post_material = new T.MeshStandardMaterial({
        color: "red",
        metalness: 0.6,
        roughness: 0.5
      });
      let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      let flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      let blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      let frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      let brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      let topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }
  }
}

let swingObCtr = 0;

// A more complicated, one-seat swingset.
// This one has actual chain links for its chains,
// and uses a nicer animation to give a more physically-plausible motion.
/**
 * @typedef AdvancedSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrAdvancedSwing extends GrObject {
  /**
   * @param {AdvancedSwingProperties} params
   */
  constructor(params = {}) {
    let swing = new T.Group();
    addPosts(swing);

    let hanger = new T.Group();
    swing.add(hanger);
    hanger.translateY(1.8);
    let l_chain = new T.Group();
    let r_chain = new T.Group();
    hanger.add(l_chain);
    hanger.add(r_chain);
    // after creating chain groups, call the function to add chain links.
    growChain(l_chain, 20);
    growChain(r_chain, 20);
    l_chain.translateZ(0.4);
    r_chain.translateZ(-0.4);

    let seat_group = new T.Group();
    let seat_geom = new T.CubeGeometry(0.4, 0.1, 1);
    let seat_mat = new T.MeshStandardMaterial({
      color: "#554433",
      metalness: 0.1,
      roughness: 0.6
    });
    let seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Swing-${swingObCtr++}`, swing);
    this.whole_ob = swing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    swing.scale.set(scale, scale, scale);

    this.swing_angle = 0;
    this.tick = function (delta, timeOfDay) {
      // in this animation, use the sine of the accumulated angle to set current rotation.
      // This means the swing moves faster as it reaches the bottom of a swing,
      // and faster at either end of the swing, like a pendulum should.
      this.swing_angle += 0.005 * delta;
      this.hanger.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 4;
      this.seat.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 16;
    };

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      let post_material = new T.MeshStandardMaterial({
        color: "red",
        metalness: 0.6,
        roughness: 0.5
      });
      let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      let flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      let blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      let frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      let brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      let topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }

    // Helper function to add "length" number of links to a chain.
    function growChain(group, length) {
      let chain_geom = new T.TorusGeometry(0.05, 0.015);
      let chain_mat = new T.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.8,
        roughness: 0.2
      });
      let link = new T.Mesh(chain_geom, chain_mat);
      group.add(link);
      for (let i = 0; i < length; i++) {
        let l_next = new T.Mesh(chain_geom, chain_mat);
        l_next.translateY(-0.07);
        link.add(l_next);
        l_next.rotation.set(0, Math.PI / 3, 0);
        link = l_next;
      }
    }
  }
}
let carouselObCtr = 0;

// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    let width = 3;
    let carousel = new T.Group();

    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    // create horses
    let horse = new T.Group();
    let body = new T.SphereBufferGeometry(1, 32, 32);
    let bodyM = new T.MeshStandardMaterial({ color: "brown" });
    let horseBody;

    let head = new T.SphereBufferGeometry(1, 32, 32);
    let headM = new T.MeshStandardMaterial({ color: "brown" });
    let horseHead;

    let neck = new T.CylinderBufferGeometry(0.1 * width, 0.1 * width, 2, 14);
    let neckM = new T.MeshStandardMaterial({ color: "brown" });
    let horseNeck;

    let leg1 = new T.CylinderBufferGeometry(0.1 * width, 0.1 * width, 3, 14);
    let leg1M = new T.MeshStandardMaterial({ color: "gray" });
    let legA;

    let leg2 = new T.CylinderBufferGeometry(0.1 * width, 0.1 * width, 3, 14);
    let leg2M = new T.MeshStandardMaterial({ color: "gray" });
    let legB;

    let leg3 = new T.CylinderBufferGeometry(0.1 * width, 0.1 * width, 3, 14);
    let leg3M = new T.MeshStandardMaterial({ color: "gray" });
    let legC;

    let leg4 = new T.CylinderBufferGeometry(0.1 * width, 0.1 * width, 3, 14);
    let leg4M = new T.MeshStandardMaterial({ color: "gray" });
    let legD;

    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5
    });
    let opole;
    let num_poles = 10;
    let poles = [];
    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      platform_group.add(opole);
      opole.translateY(1.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      poles.push(opole);

      horseNeck = new T.Mesh(neck, neckM);
      horse.add(horseNeck);
      platform_group.add(horse);
      horseNeck.scale.set(0.6, 0.3, 0.6);
      horseNeck.translateY(2.5);
      horseNeck.rotateY((2 * i * Math.PI) / num_poles);
      horseNeck.rotateZ(-0.2);
      horseNeck.translateX(0.8 * width);
      horseNeck.translateZ(1.6);

      horseBody = new T.Mesh(body, bodyM);
      horse.add(horseBody);
      platform_group.add(horse);
      horseBody.scale.set(0.7, 0.4, 0.7);
      horseBody.translateY(1.5);
      horseBody.rotateY((2 * i * Math.PI) / num_poles);
      horseBody.translateX(0.8 * width);

      horseHead = new T.Mesh(head, headM);
      horse.add(horseHead);
      platform_group.add(horse);
      horseHead.scale.set(0.5, 0.3, 0.5);
      horseHead.translateY(2.2);
      horseHead.rotateY((2 * i * Math.PI) / num_poles);
      horseHead.rotateX(0.001);
      horseHead.translateX(0.85 * width);
      horseHead.translateZ(1.4);

      legA = new T.Mesh(leg1, leg1M);
      horse.add(legA);
      platform_group.add(horse);
      legA.scale.set(0.4, 0.2, 0.4);
      legA.translateY(1);
      legA.rotateY((2 * i * Math.PI) / num_poles);
      legA.translateX(1.5);
      legA.translateZ(1.5);

      legB = new T.Mesh(leg2, leg2M);
      horse.add(legB);
      platform_group.add(horse);
      legB.scale.set(0.4, 0.2, 0.4);
      legB.translateY(1);
      legB.rotateY((2 * i * Math.PI) / num_poles);
      legB.translateX(1.8);
      legB.translateZ(1.8);

      legC = new T.Mesh(leg3, leg3M);
      horse.add(legC);
      platform_group.add(horse);
      legC.scale.set(0.4, 0.2, 0.4);
      legC.translateY(1);
      legC.rotateY((2 * i * Math.PI) / num_poles);
      legC.translateX(1.8);
      legC.translateZ(-1.8);

      legD = new T.Mesh(leg4, leg4M);
      horse.add(legD);
      platform_group.add(horse);
      legD.scale.set(0.4, 0.2, 0.4);
      legD.translateY(1);
      legD.rotateY((2 * i * Math.PI) / num_poles);
      legD.translateX(1.5);
      legD.translateZ(-1.5);

    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(4.8);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel-${carouselObCtr++}`, carousel);
    this.whole_ob = carousel;
    this.platform = platform;
    this.poles = poles;
    this.time = 0;
    this.horse = horse;
    this.carousel = carousel;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);
  }
  /** 
  * @param {Number} step
  * @param {Number} [timeOfDay]
  */
  tick(step, timeOfDay) {

    this.carousel.rotateY(0.0005 * step);

    this.time += step / 3000; // time in seconds
    // set the y position based on the time
    let t = this.time % 1; // where are we in the cycle?

    if (t < 0.1 || t > 0.9) this.horse.position.y = -0.5;
    else {
      this.horse.position.y = 0.1 + 2 * (0.16 - (0.5 - t) * (0.5 - t));

    }
  }
}

let swivelChairObCtr = 0;

// Crated Swivel chair on the fround
/**
 * @typedef SwivelChairProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSwivelchair extends GrObject {
  /**
   * @param {SwivelChairProperties} params
   */
  constructor(params = {}) {

    let width = 2.5;
    let swivelChair = new T.Group();
    swivelChair.position.set(-3, 0, 11);

    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    swivelChair.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    // draw the three chairs
    let platform_geom = new T.CylinderGeometry(0.8, 0.8, 1, 55);
    let platform_mat = new T.MeshStandardMaterial({ color: "gold", metalness: 0.3, roughness: 0.8 });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);
    platform_group.translateX(1.5);

    let chairG = new T.SphereBufferGeometry(1.2, 66, 66, 0, 5, 0, 8);
    let cm = new T.MeshStandardMaterial({ color: "pink", metalness: 0, roughness: 1 });
    let chair = new T.Mesh(chairG, cm);
    platform.add(chair);
    platform_group.scale.set(1, 0.7, 1);
    chair.position.setX(-0.1);
    chair.position.setY(1.2);
    chair.rotateY(1);

    let p2G = new T.CylinderGeometry(0.8, 0.8, 1, 55);
    let p2m = new T.MeshStandardMaterial({ color: "gold", metalness: 0.3, roughness: 0.8 });
    let p2 = new T.Mesh(p2G, p2m);
    platform_group.add(p2);
    p2.translateX(-2.5);
    p2.translateZ(-1);
    p2.position.setY(0);

    let chair2G = new T.SphereBufferGeometry(1.2, 66, 66, 0, 5, 0, 8);
    let c2g = new T.MeshStandardMaterial({ color: "pink", metalness: 0, roughness: 1 });
    let chair2 = new T.Mesh(chair2G, c2g);
    p2.add(chair2);
    platform_group.scale.set(1, 0.7, 1);
    chair2.position.setX(-0.1);
    chair2.position.setY(1.2);
    chair2.rotateY(2.5);

    let p3G = new T.CylinderGeometry(0.8, 0.8, 1, 55);
    let p3m = new T.MeshStandardMaterial({ color: "gold", metalness: 0.3, roughness: 0.8 });
    let p3 = new T.Mesh(p3G, p3m);
    platform_group.add(p3);
    p3.translateX(-2);
    p3.translateZ(1.4);
    p3.position.setY(0);

    let chair3G = new T.SphereBufferGeometry(1.2, 66, 66, 0, 5, 0, 8);
    let c3g = new T.MeshStandardMaterial({ color: "pink", metalness: 0, roughness: 1 });
    let chair3 = new T.Mesh(chair3G, c3g);
    p3.add(chair3);
    platform_group.scale.set(1, 0.7, 1);
    chair3.position.setX(-0.1);
    chair3.position.setY(1.2);
    chair3.rotateY(-1.2);

    super(`Swivelchair-${swivelChairObCtr++}`, swivelChair);
    this.swivelChair = swivelChair;
    this.whole_ob = swivelChair;
    this.time = 0;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    swivelChair.scale.set(scale, scale, scale);

  }

  tick() {
    this.swivelChair.rotateY(0.03);
  }
}
