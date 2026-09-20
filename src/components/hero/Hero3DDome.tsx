"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DDome() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 980;
    const height = container.clientHeight || 560;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera framing matching the reference image perspective
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.8);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for the entire 3D structure (dome + inner glow + particles)
    const domeGroup = new THREE.Group();
    domeGroup.position.set(0, -0.4, 0);
    scene.add(domeGroup);

    // --- 1. Existing Theme Colors (Kept Exactly as Configured) ---
    const COLOR_TEAL = new THREE.Color(0x99f6e4);     // Soft Mint / Pastel Teal
    const COLOR_SKY = new THREE.Color(0xbae6fd);      // Soft Pastel Sky Blue
    const COLOR_VIOLET = new THREE.Color(0xddd6fe);   // Soft Lavender / Lilac
    const COLOR_EMERALD = new THREE.Color(0xa7f3d0);  // Soft Pastel Emerald

    const RAY_TEAL = new THREE.Color(0x5eead4);
    const RAY_SKY = new THREE.Color(0x7dd3fc);
    const RAY_VIOLET = new THREE.Color(0xc084fc);
    const RAY_EMERALD = new THREE.Color(0x6ee7b7);

    function get4ThemeColor(u: number): THREE.Color {
      const col = new THREE.Color();
      if (u <= 0.33) {
        const t = u / 0.33;
        col.lerpColors(COLOR_TEAL, COLOR_SKY, t);
      } else if (u <= 0.66) {
        const t = (u - 0.33) / 0.33;
        col.lerpColors(COLOR_SKY, COLOR_VIOLET, t);
      } else {
        const t = (u - 0.66) / 0.34;
        col.lerpColors(COLOR_VIOLET, COLOR_EMERALD, t);
      }
      return col;
    }

    // --- 2. Inner Glowing Shell (Light Radiating from Gaps Between Pods) ---
    // In the reference, intense light shines from deep between the capsule bases
    const innerRadius = 2.85;
    const innerGeom = new THREE.SphereGeometry(innerRadius, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);
    
    const innerShaderUniforms = {
      uTime: { value: 0 },
      uTeal: { value: RAY_TEAL },
      uSky: { value: RAY_SKY },
      uViolet: { value: RAY_VIOLET },
      uEmerald: { value: RAY_EMERALD },
    };

    const innerMat = new THREE.ShaderMaterial({
      uniforms: innerShaderUniforms,
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uTeal;
        uniform vec3 uSky;
        uniform vec3 uViolet;
        uniform vec3 uEmerald;
        varying vec3 vWorldPos;
        varying vec2 vUv;

        void main() {
          // Horizontal gradient matching the 4 theme colors
          float nx = (vWorldPos.x / 3.0 + 1.0) * 0.5;
          vec3 col;
          if (nx < 0.33) {
            col = mix(uTeal, uSky, nx / 0.33);
          } else if (nx < 0.66) {
            col = mix(uSky, uViolet, (nx - 0.33) / 0.33);
          } else {
            col = mix(uViolet, uEmerald, (nx - 0.66) / 0.34);
          }

          // Dynamic glowing pulse
          float pulse = sin(uTime * 2.2 + vWorldPos.y * 2.0) * 0.15 + 0.85;
          col += vec3(0.2) * pulse;

          gl_FragColor = vec4(col * 1.2, 0.95);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    innerSphere.position.set(0, -0.8, -0.6);
    domeGroup.add(innerSphere);

    // --- 3. Radial Light Beams Intersecting the Capsule Gaps ---
    const rayUniforms = {
      uTime: { value: 0 },
      uTeal: { value: RAY_TEAL },
      uSky: { value: RAY_SKY },
      uViolet: { value: RAY_VIOLET },
      uEmerald: { value: RAY_EMERALD },
    };

    const rayMat = new THREE.ShaderMaterial({
      uniforms: rayUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uTeal;
        uniform vec3 uSky;
        uniform vec3 uViolet;
        uniform vec3 uEmerald;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          if (r > 1.0) discard;
          float angle = atan(p.y, p.x);

          // Multi-frequency rays bursting from center between pods
          float r1 = pow(abs(cos(angle * 22.0 + uTime * 0.1)), 5.0);
          float r2 = pow(abs(cos(angle * 44.0 - uTime * 0.08)), 6.0);
          float rays = mix(r1, r2, 0.5) * 1.8 + 0.35;

          float falloff = smoothstep(1.0, 0.05, r);
          float core = smoothstep(0.35, 0.0, r) * 2.2;

          float nx = (p.x + 1.0) * 0.5;
          vec3 col;
          if (nx < 0.33) {
            col = mix(uTeal, uSky, nx / 0.33);
          } else if (nx < 0.66) {
            col = mix(uSky, uViolet, (nx - 0.33) / 0.33);
          } else {
            col = mix(uViolet, uEmerald, (nx - 0.66) / 0.34);
          }
          col += vec3(0.25) * (1.0 - r);

          float alpha = (rays * falloff * 0.75 + core) * falloff * 0.8;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const rayPlane = new THREE.Mesh(new THREE.PlaneGeometry(9.0, 9.0, 32, 32), rayMat);
    rayPlane.rotation.x = -Math.PI * 0.32;
    rayPlane.position.set(0, 0.2, -0.4);
    domeGroup.add(rayPlane);

    // --- 4. True Spherical Radial Capsule Array (Matching Reference Image) ---
    // In the reference, capsules point radially outward from a central dome/sphere origin
    const sphereRadius = 3.25;
    const sphereCenter = new THREE.Vector3(0, -0.8, -0.6);

    // Elongated rounded capsules matching reference proportions
    const podRadius = 0.165;
    const podLength = 0.62;
    const podGeom = new THREE.CapsuleGeometry(podRadius, podLength, 10, 20);

    // Pearl / opal porcelain material with high clearcoat and specular reflections
    const podMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.96,
      sheen: 0.9,
      sheenColor: new THREE.Color(0xffffff),
      sheenRoughness: 0.15,
      transmission: 0.12,
      ior: 1.45,
    });

    interface PodData {
      basePos: THREE.Vector3;
      normal: THREE.Vector3;
      rotX: number;
      rotY: number;
      rotZ: number;
      color: THREE.Color;
      distFromApex: number;
    }

    const pods: PodData[] = [];

    // Concentric rings distributed across the front-facing hemisphere
    // Latitude angles theta: 85 deg (front-facing apex) down to 5 deg (silhouette edge)
    const ringLats = [
      { latDeg: 82, count: 6 },
      { latDeg: 75, count: 12 },
      { latDeg: 68, count: 18 },
      { latDeg: 60, count: 24 },
      { latDeg: 52, count: 30 },
      { latDeg: 44, count: 36 },
      { latDeg: 36, count: 42 },
      { latDeg: 28, count: 48 },
      { latDeg: 20, count: 54 },
      { latDeg: 12, count: 60 },
      { latDeg: 4,  count: 64 },
    ];

    ringLats.forEach((ring, rIdx) => {
      const phi = (ring.latDeg * Math.PI) / 180;
      const ringRadius = sphereRadius * Math.cos(phi);
      const ringY = sphereRadius * Math.sin(phi);

      const offsetAngle = (rIdx % 2) * (Math.PI / ring.count);

      for (let i = 0; i < ring.count; i++) {
        const theta = (i * Math.PI * 2) / ring.count + offsetAngle;
        
        // Spherical surface position relative to sphere center
        const rx = ringRadius * Math.cos(theta);
        const rz = ringRadius * Math.sin(theta) * 0.88; // Slight flattening for perspective
        const ry = ringY;

        const worldPos = new THREE.Vector3(
          sphereCenter.x + rx,
          sphereCenter.y + ry,
          sphereCenter.z + rz
        );

        // Normal vector pointing radially outward from sphere origin
        const normal = new THREE.Vector3(rx, ry, rz).normalize();

        // Orient capsule along normal
        const dummyMatrix = new THREE.Matrix4();
        dummyMatrix.lookAt(new THREE.Vector3(0, 0, 0), normal, new THREE.Vector3(0, 1, 0));
        const dummyEuler = new THREE.Euler().setFromRotationMatrix(dummyMatrix);

        // Map X position to the 4 theme colors
        const normX = (worldPos.x / 3.2 + 1.0) * 0.5;
        const clampedU = THREE.MathUtils.clamp(normX, 0, 1);
        const pastelCol = get4ThemeColor(clampedU);
        
        // Blend with white for the pearl finish
        const finalCol = new THREE.Color(0xffffff).lerp(pastelCol, 0.65);

        pods.push({
          basePos: worldPos,
          normal: normal,
          rotX: dummyEuler.x,
          rotY: dummyEuler.y,
          rotZ: dummyEuler.z,
          color: finalCol,
          distFromApex: 1.0 - Math.sin(phi),
        });
      }
    });

    const instancedMesh = new THREE.InstancedMesh(podGeom, podMaterial, pods.length);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    for (let i = 0; i < pods.length; i++) {
      instancedMesh.setColorAt(i, pods[i].color);
    }
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    domeGroup.add(instancedMesh);

    // --- 5. Cosmic Glitter / Stardust Particle Arc (As seen in Reference Image) ---
    // In the reference image, there is an arc of glittering stardust above the dome
    const stardustCount = 380;
    const stardustGeom = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);
    const stardustColors = new Float32Array(stardustCount * 3);
    const stardustVelocities: { angle: number; radius: number; speed: number; phase: number }[] = [];

    const sparkPalette = [
      RAY_TEAL,
      RAY_SKY,
      RAY_VIOLET,
      RAY_EMERALD,
      new THREE.Color(0xffffff),
    ];

    const sparkCanvas = document.createElement("canvas");
    sparkCanvas.width = 32;
    sparkCanvas.height = 32;
    const sCtx = sparkCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 32, 32);
    }
    const sparkTexture = new THREE.CanvasTexture(sparkCanvas);

    for (let i = 0; i < stardustCount; i++) {
      const i3 = i * 3;
      // Distribute in a curved arc above and around the dome
      const angle = Math.PI * 0.15 + (i / stardustCount) * Math.PI * 0.70 + (Math.random() - 0.5) * 0.2;
      const radius = 3.6 + Math.random() * 1.5;
      const px = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
      const py = Math.sin(angle) * (radius * 0.82) - 0.2 + (Math.random() - 0.5) * 0.5;
      const pz = (Math.random() - 0.5) * 2.2 - 0.4;

      stardustPos[i3] = px;
      stardustPos[i3 + 1] = py;
      stardustPos[i3 + 2] = pz;

      const chosen = sparkPalette[i % sparkPalette.length];
      stardustColors[i3] = chosen.r;
      stardustColors[i3 + 1] = chosen.g;
      stardustColors[i3 + 2] = chosen.b;

      stardustVelocities.push({
        angle: angle,
        radius: radius,
        speed: 0.0008 + Math.random() * 0.0015,
        phase: Math.random() * Math.PI * 2,
      });
    }

    stardustGeom.setAttribute("position", new THREE.BufferAttribute(stardustPos, 3));
    stardustGeom.setAttribute("color", new THREE.BufferAttribute(stardustColors, 3));

    const stardustMat = new THREE.PointsMaterial({
      size: 0.12,
      map: sparkTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const stardust = new THREE.Points(stardustGeom, stardustMat);
    domeGroup.add(stardust);

    // --- 6. Large Floating Bokeh Orbs (Matching Reference Image) ---
    const bokehCount = 6;
    const bokehGeom = new THREE.BufferGeometry();
    const bokehPos = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);

    const bokehCoords = [
      { x: -3.2, y: 1.8, z: -1.0, col: RAY_TEAL },
      { x: 3.4,  y: 1.6, z: -1.2, col: RAY_EMERALD },
      { x: -2.0, y: 2.6, z: -1.5, col: RAY_VIOLET },
      { x: 2.2,  y: 2.5, z: -1.5, col: RAY_SKY },
      { x: -0.8, y: 1.2, z: 0.2,  col: RAY_VIOLET },
      { x: 1.4,  y: 0.6, z: 0.5,  col: RAY_TEAL },
    ];

    for (let i = 0; i < bokehCount; i++) {
      const i3 = i * 3;
      bokehPos[i3] = bokehCoords[i].x;
      bokehPos[i3 + 1] = bokehCoords[i].y;
      bokehPos[i3 + 2] = bokehCoords[i].z;

      bokehColors[i3] = bokehCoords[i].col.r;
      bokehColors[i3 + 1] = bokehCoords[i].col.g;
      bokehColors[i3 + 2] = bokehCoords[i].col.b;
    }

    bokehGeom.setAttribute("position", new THREE.BufferAttribute(bokehPos, 3));
    bokehGeom.setAttribute("color", new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 0.45,
      map: sparkTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    const bokeh = new THREE.Points(bokehGeom, bokehMat);
    domeGroup.add(bokeh);

    // --- 7. Lighting ---
    // Front directional light for crisp white specular reflections on capsule heads
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(0, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(0, -2, 5);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    // Internal point lights placed right inside the core for vibrant light bursting between capsules
    const pTeal = new THREE.PointLight(0x5eead4, 4.5, 8, 1.5);
    pTeal.position.set(-1.4, 0.2, 0.2);
    domeGroup.add(pTeal);

    const pSky = new THREE.PointLight(0x7dd3fc, 4.5, 8, 1.5);
    pSky.position.set(-0.5, 0.4, 0.4);
    domeGroup.add(pSky);

    const pViolet = new THREE.PointLight(0xc084fc, 4.8, 8, 1.5);
    pViolet.position.set(0.5, 0.4, 0.4);
    domeGroup.add(pViolet);

    const pEmerald = new THREE.PointLight(0x6ee7b7, 4.5, 8, 1.5);
    pEmerald.position.set(1.4, 0.2, 0.2);
    domeGroup.add(pEmerald);

    // --- 8. Mouse Tracking & Animation ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = -0.10;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = nx;
      mouseY = ny;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Update shader times
      rayUniforms.uTime.value = time;
      innerShaderUniforms.uTime.value = time;

      // Pulse core lights
      const pulse = Math.sin(time * 2.2) * 0.5 + 4.2;
      pTeal.intensity = pulse;
      pSky.intensity = pulse;
      pViolet.intensity = pulse;
      pEmerald.intensity = pulse;

      // Smooth mouse tilt
      targetRotX = -0.10 - mouseY * 0.08;
      targetRotY = mouseX * 0.14;
      domeGroup.rotation.x += (targetRotX - domeGroup.rotation.x) * 0.05;
      domeGroup.rotation.y += (targetRotY - domeGroup.rotation.y) * 0.05;

      // Kinetic sinusoidal breathing wave radiating from apex
      for (let i = 0; i < pods.length; i++) {
        const pod = pods[i];
        const wave = Math.sin(time * 2.0 - pod.distFromApex * 3.5) * 0.038;

        // Displace along surface normal for true 3D radial pulsation
        dummy.position.set(
          pod.basePos.x + pod.normal.x * wave,
          pod.basePos.y + pod.normal.y * wave,
          pod.basePos.z + pod.normal.z * wave
        );
        dummy.rotation.set(pod.rotX, pod.rotY, pod.rotZ);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Drift stardust particles
      const sPos = stardustGeom.getAttribute("position") as THREE.BufferAttribute;
      const sArr = sPos.array as Float32Array;
      for (let i = 0; i < stardustCount; i++) {
        const i3 = i * 3;
        const vel = stardustVelocities[i];
        vel.angle += vel.speed;
        sArr[i3] = Math.cos(vel.angle) * vel.radius;
        sArr[i3 + 1] = Math.sin(vel.angle) * (vel.radius * 0.82) - 0.2 + Math.sin(time * 1.2 + vel.phase) * 0.05;
      }
      sPos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      podGeom.dispose();
      podMaterial.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      rayMat.dispose();
      stardustGeom.dispose();
      stardustMat.dispose();
      sparkTexture.dispose();
      bokehGeom.dispose();
      bokehMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative pointer-events-none select-none"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    />
  );
}
