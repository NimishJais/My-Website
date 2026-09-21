"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ------------------------------- canvas helpers ------------------------------ */

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  return { canvas, ctx };
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Fake code-editor screen texture with a tinted syntax palette */
function makeCodeTexture(accent: string): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(512, 340);
  ctx.fillStyle = "#0c1424";
  ctx.fillRect(0, 0, 512, 340);
  // title bar
  ctx.fillStyle = "#131f38";
  ctx.fillRect(0, 0, 512, 36);
  const dots = ["#ff5f57", "#febc2e", "#28c840"];
  dots.forEach((d, i) => {
    ctx.fillStyle = d;
    ctx.beginPath();
    ctx.arc(26 + i * 26, 18, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  const palette = [accent, "#7dd3fc", "#c4b5fd", "#fbbf24", "#94a3b8", "#5eead4"];
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  let y = 60;
  for (let i = 0; i < 12; i++) {
    const indent = 26 + Math.floor(rand() * 5) * 26;
    const wLine = 70 + rand() * 300;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
    roundRectPath(ctx, indent, y, Math.min(wLine, 512 - indent - 22), 12, 6);
    ctx.fill();
    if (rand() > 0.72) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#64748b";
      roundRectPath(ctx, indent, y, Math.min(wLine * 0.5, 512 - indent - 22), 12, 6);
      ctx.fill();
    }
    y += 23;
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Gradient orb with a centered text label (no trademark artwork) */
function makeOrbTexture(label: string, c1: string, c2: string): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);
  const g = ctx.createRadialGradient(105, 95, 15, 128, 128, 150);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(128, 128, 126, 0, Math.PI * 2);
  ctx.fill();
  // glossy highlight
  const hg = ctx.createRadialGradient(92, 78, 4, 92, 78, 62);
  hg.addColorStop(0, "rgba(255,255,255,0.55)");
  hg.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.arc(92, 78, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 38px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 10;
  ctx.fillText(label, 128, 134);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Small floating pill label rendered as a sprite */
function makeLabelSprite(text: string, fg = "#ffffff", fontSize = 40): THREE.Sprite {
  const { canvas, ctx } = makeCanvas(512, 128);
  ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = "rgba(10, 22, 38, 0.72)";
  roundRectPath(ctx, 256 - tw / 2 - 30, 26, tw + 60, 76, 38);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 66);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.85, 0.46, 1);
  return sprite;
}

/** Soft radial sprite texture for steam / dust particles */
function makeSoftTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(64, 64);
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.4, "rgba(255,255,255,0.32)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/* --------------------------------- component --------------------------------- */

interface OrbState {
  mesh: THREE.Mesh;
  mat: THREE.MeshStandardMaterial;
  baseY: number;
  phase: number;
  speed: number;
  scale: number;
  vel: number;
}

interface ModeVals {
  hemi: number;
  dir: number;
  amb: number;
  fog: THREE.Color;
  fogNear: number;
  fogFar: number;
  screen: number;
  monitor: number;
  mat: number;
  lamp: number;
  bulb: number;
  rgb: number;
  orb: number;
  exposure: number;
}

export function DeveloperDesk() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1250;
    const height = container.clientHeight || 620;

    /* ------------------------------ renderer ------------------------------ */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeafaf4, 16, 32);

    // Classic isometric-style angle: equal azimuth, elevated view
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    const camBase = new THREE.Vector3(8.6, 7.4, 8.6);
    const lookTarget = new THREE.Vector3(0, 1.55, 0);
    camera.position.copy(camBase);
    camera.lookAt(lookTarget);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;

    const UP = new THREE.Vector3(0, 1, 0);

    /* ------------------------------ materials ----------------------------- */
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xd3a97c,
      roughness: 0.62,
      metalness: 0.05,
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.42,
      metalness: 0.65,
    });
    const aluMat = new THREE.MeshStandardMaterial({
      color: 0xdde5ee,
      roughness: 0.35,
      metalness: 0.55,
    });
    const darkPlastic = new THREE.MeshStandardMaterial({
      color: 0x2b3648,
      roughness: 0.6,
      metalness: 0.2,
    });
    const screenSideMat = new THREE.MeshStandardMaterial({
      color: 0x1c2534,
      roughness: 0.5,
      metalness: 0.4,
    });

    const world = new THREE.Group();
    scene.add(world);

    /* --------------------------------- desk --------------------------------- */
    const TOP_Y = 1.55;
    const deskTop = new THREE.Mesh(new RoundedBoxGeometry(6.4, 0.28, 3.4, 4, 0.09), woodMat);
    deskTop.position.y = TOP_Y;
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    world.add(deskTop);

    const legGeom = new THREE.CylinderGeometry(0.09, 0.09, TOP_Y - 0.14, 14);
    (
      [
        [-2.9, -1.4],
        [2.9, -1.4],
        [-2.9, 1.4],
        [2.9, 1.4],
      ] as const
    ).forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeom, darkMetalMat);
      leg.position.set(x, (TOP_Y - 0.14) / 2, z);
      leg.castShadow = true;
      world.add(leg);
    });

    // transparent shadow catcher to ground the floating desk
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.13 })
    );
    catcher.rotation.x = -Math.PI / 2;
    catcher.position.y = 0;
    catcher.receiveShadow = true;
    world.add(catcher);

    const surfaceY = TOP_Y + 0.14;

    // desk mat with emissive edge glow (neon in night mode)
    const matGlowMat = new THREE.MeshStandardMaterial({
      color: 0x243144,
      roughness: 0.85,
      metalness: 0.05,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.12,
    });
    const deskMat = new THREE.Mesh(new RoundedBoxGeometry(4.7, 0.035, 2.05, 2, 0.017), matGlowMat);
    deskMat.position.set(0, surfaceY + 0.018, 0.25);
    deskMat.receiveShadow = true;
    world.add(deskMat);
    const matTopY = surfaceY + 0.036;

    /* -------------------------------- laptop ------------------------------- */
    const laptop = new THREE.Group();
    laptop.position.set(-0.35, matTopY, 0.15);
    world.add(laptop);

    const lapBase = new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.07, 1.1, 2, 0.03), aluMat);
    lapBase.position.y = 0.035;
    lapBase.castShadow = true;
    laptop.add(lapBase);

    const deck = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x9aa7bb, roughness: 0.7 })
    );
    deck.rotation.x = -Math.PI / 2;
    deck.position.set(0, 0.072, 0.18);
    laptop.add(deck);

    const codeTex = makeCodeTexture("#5eead4");
    const screenFrontMat = new THREE.MeshStandardMaterial({
      map: codeTex,
      emissive: 0xffffff,
      emissiveMap: codeTex,
      emissiveIntensity: 0.85,
      roughness: 0.35,
    });
    const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.06, 0.05), [
      screenSideMat,
      screenSideMat,
      screenSideMat,
      screenSideMat,
      screenFrontMat,
      screenSideMat,
    ]);
    screenMesh.position.y = 0.53;
    screenMesh.castShadow = true;
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.07, -0.52);
    screenGroup.rotation.x = -0.22; // lean back slightly
    screenGroup.add(screenMesh);
    laptop.add(screenGroup);

    const screenGlow = new THREE.PointLight(0x86d8ff, 1.1, 5.5, 1.7);
    screenGlow.position.set(-0.35, matTopY + 0.9, 1.15);
    world.add(screenGlow);

    /* ---------------------------- vertical monitor ---------------------------- */
    const monitor = new THREE.Group();
    monitor.position.set(1.85, matTopY, -0.55);
    monitor.rotation.y = -0.28;
    world.add(monitor);

    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.06, 20), darkMetalMat);
    standBase.position.y = 0.03;
    standBase.castShadow = true;
    monitor.add(standBase);

    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.75, 0.09), darkMetalMat);
    pole.position.y = 0.42;
    pole.castShadow = true;
    monitor.add(pole);

    const monCodeTex = makeCodeTexture("#c4b5fd");
    const monFrontMat = new THREE.MeshStandardMaterial({
      map: monCodeTex,
      emissive: 0xffffff,
      emissiveMap: monCodeTex,
      emissiveIntensity: 0.85,
      roughness: 0.35,
    });
    const monScreen = new THREE.Mesh(new THREE.BoxGeometry(0.98, 1.5, 0.06), [
      screenSideMat,
      screenSideMat,
      screenSideMat,
      screenSideMat,
      monFrontMat,
      screenSideMat,
    ]);
    monScreen.position.y = 1.55;
    monScreen.castShadow = true;
    monitor.add(monScreen);

    const monitorGlow = new THREE.PointLight(0xc9b8ff, 1.0, 5, 1.7);
    monitorGlow.position.set(1.55, matTopY + 1.5, 0.35);
    world.add(monitorGlow);

    /* --------------------------- mechanical keyboard --------------------------- */
    const keyboard = new THREE.Group();
    keyboard.position.set(-0.35, matTopY, 1.12);
    keyboard.rotation.y = 0.05;
    world.add(keyboard);

    const kbCase = new THREE.Mesh(new RoundedBoxGeometry(2.0, 0.1, 0.7, 2, 0.04), darkPlastic);
    kbCase.position.y = 0.07;
    kbCase.castShadow = true;
    keyboard.add(kbCase);

    // RGB underglow strip (hue cycles)
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x5eead4,
      emissiveIntensity: 1.4,
      roughness: 0.5,
    });
    const strip = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.035, 0.74), stripMat);
    strip.position.y = 0.028;
    keyboard.add(strip);

    const capGeom = new THREE.BoxGeometry(0.115, 0.085, 0.115);
    const capMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.05 });
    const COLS = 14;
    const ROWS = 5;
    const caps = new THREE.InstancedMesh(capGeom, capMat, COLS * ROWS);
    const dummy = new THREE.Object3D();
    const capColor = new THREE.Color();
    let ci = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dummy.position.set((c - (COLS - 1) / 2) * 0.136, 0.16, (r - (ROWS - 1) / 2) * 0.128);
        dummy.updateMatrix();
        caps.setMatrixAt(ci, dummy.matrix);
        if (r === ROWS - 1 && c >= 4 && c <= 9) capColor.set(0x5eead4); // spacebar accent
        else if ((r === 0 && c === COLS - 1) || (r === 2 && c === COLS - 1))
          capColor.set(0xc4b5fd); // accent keys
        else capColor.set(0xe9eef5);
        const jitter = (Math.abs(Math.sin(ci * 12.9898) * 43758.5453) % 1) * 0.03;
        capColor.offsetHSL(0, 0, -jitter);
        caps.setColorAt(ci, capColor);
        ci++;
      }
    }
    caps.instanceMatrix.needsUpdate = true;
    if (caps.instanceColor) caps.instanceColor.needsUpdate = true;
    keyboard.add(caps);

    const rgbLight = new THREE.PointLight(0x5eead4, 0.8, 3.2, 1.8);
    rgbLight.position.set(-0.35, matTopY + 0.28, 1.12);
    world.add(rgbLight);

    /* ------------------------------ coffee + steam ----------------------------- */
    const softTex = makeSoftTexture();
    const mug = new THREE.Group();
    const mugX = -2.0;
    const mugZ = 0.55;
    mug.position.set(mugX, matTopY, mugZ);
    world.add(mug);

    const mugMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 });
    const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.42, 24), mugMat);
    mugBody.position.y = 0.21;
    mugBody.castShadow = true;
    mug.add(mugBody);

    const coffee = new THREE.Mesh(
      new THREE.CircleGeometry(0.185, 24),
      new THREE.MeshStandardMaterial({ color: 0x4a2c17, roughness: 0.25 })
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.405;
    mug.add(coffee);

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.035, 12, 24, Math.PI), mugMat);
    handle.position.set(0.22, 0.22, 0);
    handle.rotation.z = -Math.PI / 2;
    mug.add(handle);

    // animated steam particles (additive fade via vertex colors)
    const S_COUNT = 26;
    const sGeom = new THREE.BufferGeometry();
    const sPos = new Float32Array(S_COUNT * 3);
    const sCol = new Float32Array(S_COUNT * 3);
    const sLife = new Float32Array(S_COUNT);
    const sSpeed = new Float32Array(S_COUNT);
    const sPhase = new Float32Array(S_COUNT);
    for (let i = 0; i < S_COUNT; i++) {
      sLife[i] = Math.random();
      sSpeed[i] = 0.25 + Math.random() * 0.3;
      sPhase[i] = Math.random() * Math.PI * 2;
    }
    sGeom.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    sGeom.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.34,
      map: softTex,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const steam = new THREE.Points(sGeom, sMat);
    steam.position.set(mugX, matTopY + 0.42, mugZ);
    world.add(steam);

    /* -------------------------------- succulent ------------------------------- */
    const plant = new THREE.Group();
    plant.position.set(2.55, matTopY, 0.85);
    world.add(plant);

    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.155, 0.3, 18),
      new THREE.MeshStandardMaterial({ color: 0xc2703e, roughness: 0.8 })
    );
    pot.position.y = 0.15;
    pot.castShadow = true;
    plant.add(pot);

    const soil = new THREE.Mesh(
      new THREE.CircleGeometry(0.185, 18),
      new THREE.MeshStandardMaterial({ color: 0x3b2a1e, roughness: 1 })
    );
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 0.295;
    plant.add(soil);

    const leafColors = [0x4ade80, 0x22c55e, 0x86efac];
    for (let i = 0; i < 9; i++) {
      const leaf = new THREE.Mesh(
        new THREE.ConeGeometry(0.085, 0.36, 6),
        new THREE.MeshStandardMaterial({ color: leafColors[i % 3], roughness: 0.7 })
      );
      const outer = i < 6;
      const ang = ((i % 6) / 6) * Math.PI * 2 + (outer ? 0 : 0.5);
      const tilt = outer ? 0.62 : 0.25;
      const rad = outer ? 0.11 : 0.04;
      leaf.position.set(Math.cos(ang) * rad, 0.43, Math.sin(ang) * rad);
      leaf.rotation.set(Math.sin(ang) * tilt, 0, -Math.cos(ang) * tilt);
      leaf.castShadow = true;
      plant.add(leaf);
    }

    /* ------------------------------ desk lamp -------------------------------- */
    const lampGroup = new THREE.Group();
    lampGroup.position.set(2.5, matTopY, -1.05);
    world.add(lampGroup);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.27, 0.07, 20), darkMetalMat);
    lampBase.position.y = 0.035;
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    const jointPos = new THREE.Vector3(0.29, 1.12, 0);
    const arm1Base = new THREE.Vector3(0, 0.07, 0);
    const arm1Dir = jointPos.clone().sub(arm1Base);
    const arm1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, arm1Dir.length(), 12),
      darkMetalMat
    );
    arm1.position.copy(arm1Base).addScaledVector(arm1Dir, 0.5);
    arm1.quaternion.setFromUnitVectors(UP, arm1Dir.clone().normalize());
    arm1.castShadow = true;
    lampGroup.add(arm1);

    const joint = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), darkMetalMat);
    joint.position.copy(jointPos);
    lampGroup.add(joint);

    const headAnchor = new THREE.Vector3(-0.05, 1.72, 0.3);
    const arm2Dir = headAnchor.clone().sub(jointPos);
    const arm2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, arm2Dir.length(), 12),
      darkMetalMat
    );
    arm2.position.copy(jointPos).addScaledVector(arm2Dir, 0.5);
    arm2.quaternion.setFromUnitVectors(UP, arm2Dir.clone().normalize());
    arm2.castShadow = true;
    lampGroup.add(arm2);

    // shade aimed at the desk surface
    const aimLocal = new THREE.Vector3(-1.3, 0.05, 1.25);
    const shadeDir = aimLocal.clone().sub(headAnchor).normalize();
    const shade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.32, 0.42, 20, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x0f766e,
        roughness: 0.45,
        metalness: 0.3,
        side: THREE.DoubleSide,
      })
    );
    shade.position.copy(headAnchor);
    shade.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), shadeDir);
    shade.castShadow = true;
    lampGroup.add(shade);

    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff3d6,
      emissive: 0xffc98a,
      emissiveIntensity: 0.3,
      roughness: 0.4,
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), bulbMat);
    bulb.position.copy(headAnchor).addScaledVector(shadeDir, 0.08);
    lampGroup.add(bulb);

    const lampLight = new THREE.PointLight(0xffc98a, 0.15, 7, 1.8);
    lampLight.position.copy(bulb.position);
    lampGroup.add(lampLight);

    // invisible-but-raycastable click target around the lamp
    const hitProxy = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 8, 8),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
      })
    );
    hitProxy.position.set(0.1, 1.1, 0.1);
    hitProxy.userData.isLamp = true;
    lampGroup.add(hitProxy);

    const lampHint = makeLabelSprite("click the lamp");
    lampHint.position.set(0.35, 2.3, 0.1);
    lampGroup.add(lampHint);

    /* ------------------------------- status LED ------------------------------ */
    const ledBase = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.05, 16), darkPlastic);
    ledBase.position.set(-2.55, matTopY + 0.025, 1.0);
    world.add(ledBase);

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      emissive: 0x22ff66,
      emissiveIntensity: 1.4,
      roughness: 0.4,
    });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 14), ledMat);
    led.position.set(-2.55, matTopY + 0.1, 1.0);
    world.add(led);

    const ledLabel = makeLabelSprite("Available to Hire", "#bbf7d0", 38);
    ledLabel.scale.set(2.1, 0.52, 1);
    ledLabel.position.set(-2.55, matTopY + 0.62, 1.0);
    world.add(ledLabel);

    /* ------------------------------- tech orbs -------------------------------- */
    const orbDefs = [
      { label: "Next.js", c1: "#e2e8f0", c2: "#0f172a", pos: [-3.5, 3.7, -0.7] },
      { label: "Python", c1: "#7dd3fc", c2: "#1d4ed8", pos: [-1.8, 4.4, -1.3] },
      { label: "AWS", c1: "#fcd34d", c2: "#b45309", pos: [0.1, 4.0, -1.6] },
      { label: "Docker", c1: "#93c5fd", c2: "#1e40af", pos: [2.0, 4.5, -1.0] },
      { label: "AI", c1: "#c4b5fd", c2: "#6d28d9", pos: [3.6, 3.6, -0.3] },
    ] as const;
    const orbs: OrbState[] = [];
    const orbGeom = new THREE.SphereGeometry(0.34, 28, 28);
    orbDefs.forEach((def, i) => {
      const tex = makeOrbTexture(def.label, def.c1, def.c2);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        emissive: 0xffffff,
        emissiveMap: tex,
        emissiveIntensity: 0.3,
        roughness: 0.35,
      });
      const mesh = new THREE.Mesh(orbGeom, mat);
      mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
      mesh.userData.isOrb = true;
      world.add(mesh);
      orbs.push({
        mesh,
        mat,
        baseY: def.pos[1],
        phase: i * 1.37,
        speed: 0.9 + i * 0.13,
        scale: 1,
        vel: 0,
      });
    });

    /* ------------------------------- ambient dust ----------------------------- */
    const D_COUNT = 70;
    const dGeom = new THREE.BufferGeometry();
    const dPos = new Float32Array(D_COUNT * 3);
    for (let i = 0; i < D_COUNT; i++) {
      dPos[i * 3] = -5 + Math.random() * 10;
      dPos[i * 3 + 1] = 0.4 + Math.random() * 4.8;
      dPos[i * 3 + 2] = -3 + Math.random() * 5;
    }
    dGeom.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    const dust = new THREE.Points(
      dGeom,
      new THREE.PointsMaterial({
        size: 0.06,
        map: softTex,
        transparent: true,
        opacity: 0.35,
        color: 0x99f6e4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    world.add(dust);

    /* ------------------------------ lighting rig ----------------------------- */
    const hemi = new THREE.HemisphereLight(0xffffff, 0xd9e8e2, 1.05);
    scene.add(hemi);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.1);
    dirLight.position.set(6, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.left = -7;
    dirLight.shadow.camera.right = 7;
    dirLight.shadow.camera.top = 7;
    dirLight.shadow.camera.bottom = -7;
    dirLight.shadow.camera.near = 2;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.bias = -0.0004;
    scene.add(dirLight);

    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(amb);

    /* --------------------------- day / night lighting -------------------------- */
    const DAY: ModeVals = {
      hemi: 1.05, dir: 2.1, amb: 0.4,
      fog: new THREE.Color(0xeafaf4), fogNear: 16, fogFar: 32,
      screen: 0.85, monitor: 0.85, mat: 0.12,
      lamp: 0.15, bulb: 0.3, rgb: 0.7, orb: 0.3, exposure: 1.0,
    };
    const NIGHT: ModeVals = {
      hemi: 0.16, dir: 0.32, amb: 0.12,
      fog: new THREE.Color(0x0b1322), fogNear: 13, fogFar: 27,
      screen: 2.6, monitor: 2.6, mat: 2.0,
      lamp: 2.8, bulb: 3.4, rgb: 2.2, orb: 1.0, exposure: 1.06,
    };
    let target: ModeVals = DAY;
    let isNight = false;
    const cur = {
      hemi: DAY.hemi, dir: DAY.dir, amb: DAY.amb,
      fogNear: DAY.fogNear, fogFar: DAY.fogFar,
      screen: DAY.screen, monitor: DAY.monitor, mat: DAY.mat,
      lamp: DAY.lamp, bulb: DAY.bulb, rgb: DAY.rgb, orb: DAY.orb,
      exposure: DAY.exposure,
    };
    const curFog = DAY.fog.clone();

    /* ------------------------------- interaction ------------------------------ */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hoveredOrb: OrbState | null = null;
    let parTargetX = 0;
    let parTargetY = 0;
    let parX = 0;
    let parY = 0;

    function setNDC(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    const onPointerMove = (e: PointerEvent) => {
      setNDC(e);
      parTargetX = ndc.x;
      parTargetY = ndc.y;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(
        [...orbs.map((o) => o.mesh), hitProxy],
        false
      );
      hoveredOrb = null;
      let hoveringLamp = false;
      for (const h of hits) {
        const obj = h.object as THREE.Mesh;
        if (obj.userData.isLamp) hoveringLamp = true;
        const orb = orbs.find((o) => o.mesh === obj);
        if (orb && !hoveredOrb) hoveredOrb = orb;
      }
      canvas.style.cursor = hoveredOrb || hoveringLamp ? "pointer" : "default";
    };

    const onClick = (e: PointerEvent) => {
      setNDC(e);
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObject(hitProxy, false);
      if (hits.length > 0) {
        isNight = !isNight;
        target = isNight ? NIGHT : DAY;
      }
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("click", onClick);

    /* --------------------------------- resize --------------------------------- */
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    /* --------------------------------- animate -------------------------------- */
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // smooth day/night transitions
      const k = 1 - Math.exp(-dt * 4.5);
      cur.hemi += (target.hemi - cur.hemi) * k;
      cur.dir += (target.dir - cur.dir) * k;
      cur.amb += (target.amb - cur.amb) * k;
      cur.fogNear += (target.fogNear - cur.fogNear) * k;
      cur.fogFar += (target.fogFar - cur.fogFar) * k;
      cur.screen += (target.screen - cur.screen) * k;
      cur.monitor += (target.monitor - cur.monitor) * k;
      cur.mat += (target.mat - cur.mat) * k;
      cur.lamp += (target.lamp - cur.lamp) * k;
      cur.bulb += (target.bulb - cur.bulb) * k;
      cur.rgb += (target.rgb - cur.rgb) * k;
      cur.orb += (target.orb - cur.orb) * k;
      cur.exposure += (target.exposure - cur.exposure) * k;
      curFog.lerp(target.fog, k);

      hemi.intensity = cur.hemi;
      dirLight.intensity = cur.dir;
      amb.intensity = cur.amb;
      const fog = scene.fog as THREE.Fog;
      fog.color.copy(curFog);
      fog.near = cur.fogNear;
      fog.far = cur.fogFar;
      screenFrontMat.emissiveIntensity = cur.screen;
      monFrontMat.emissiveIntensity = cur.monitor;
      matGlowMat.emissiveIntensity = cur.mat;
      lampLight.intensity = cur.lamp;
      bulbMat.emissiveIntensity = cur.bulb;
      rgbLight.intensity = cur.rgb;
      for (const o of orbs) o.mat.emissiveIntensity = cur.orb;
      renderer.toneMappingExposure = cur.exposure;

      // RGB underglow hue cycle
      rgbLight.color.setHSL((t * 0.06) % 1, 0.75, 0.6);
      stripMat.emissive.copy(rgbLight.color);

      // pulsing status LED
      ledMat.emissiveIntensity = 1.3 + Math.sin(t * 4.2) * 0.9;

      // steam particles: rise, drift, fade, loop
      const posAttr = sGeom.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = sGeom.getAttribute("color") as THREE.BufferAttribute;
      const pArr = posAttr.array as Float32Array;
      const cArr = colAttr.array as Float32Array;
      for (let i = 0; i < S_COUNT; i++) {
        sLife[i] += dt * sSpeed[i];
        if (sLife[i] > 1) sLife[i] = 0;
        const l = sLife[i];
        const i3 = i * 3;
        pArr[i3] = Math.sin(l * 6 + sPhase[i]) * 0.09 * l;
        pArr[i3 + 1] = l * 1.15;
        pArr[i3 + 2] = Math.cos(l * 5 + sPhase[i]) * 0.06 * l;
        const fade = (1 - l) * 0.5;
        cArr[i3] = fade;
        cArr[i3 + 1] = fade;
        cArr[i3 + 2] = fade;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // tech orbs: bob + springy hover pop
      for (const o of orbs) {
        o.mesh.position.y = o.baseY + Math.sin(t * o.speed + o.phase) * 0.18;
        o.mesh.rotation.y += dt * 0.35;
        const goal = o === hoveredOrb ? 1.38 : 1;
        o.vel += ((goal - o.scale) * 90 - o.vel * 12) * dt;
        o.scale += o.vel * dt;
        o.mesh.scale.setScalar(THREE.MathUtils.clamp(o.scale, 0.7, 1.7));
      }

      // lamp hint gentle bob
      lampHint.position.y = 2.3 + Math.sin(t * 2.1) * 0.05;

      // ambient dust drift
      const dAttr = dGeom.getAttribute("position") as THREE.BufferAttribute;
      const dArr = dAttr.array as Float32Array;
      for (let i = 0; i < D_COUNT; i++) {
        const i3 = i * 3;
        dArr[i3 + 1] += dt * 0.12;
        dArr[i3] += Math.sin(t * 0.5 + i) * dt * 0.05;
        if (dArr[i3 + 1] > 5.2) dArr[i3 + 1] = 0.4;
      }
      dAttr.needsUpdate = true;

      // gentle mouse parallax on the camera
      parX += (parTargetX - parX) * (1 - Math.exp(-dt * 3));
      parY += (parTargetY - parY) * (1 - Math.exp(-dt * 3));
      camera.position.set(camBase.x + parX * 0.9, camBase.y - parY * 0.55, camBase.z);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);

    // pause when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* --------------------------------- cleanup -------------------------------- */
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = (mesh as THREE.Mesh).material as
          | THREE.Material
          | THREE.Material[]
          | undefined;
        if (!material) return;
        const mats = Array.isArray(material) ? material : [material];
        for (const m of mats) {
          const sm = m as THREE.MeshStandardMaterial;
          if (sm.map) sm.map.dispose();
          if (sm.emissiveMap && sm.emissiveMap !== sm.map) sm.emissiveMap.dispose();
          m.dispose();
        }
      });

      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative pointer-events-auto select-none"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    />
  );
}
