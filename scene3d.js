/**
 * ONEFORGE® — INTERACTIVE 3D HERO SCULPTURE (Three.js + Procedural Fallback)
 * ============================================================================
 * Creates a metallic, dark-chrome sculptural centerpiece with #C5F36A and
 * #A6FF4D lime-green studio rim lighting that responds subtly to mouse
 * movement and scroll progress without overpowering the hero typography.
 */

(function () {
  "use strict";

  function initHero3D() {
    const container = document.getElementById("hero-3d-canvas-wrap");
    const canvas = document.getElementById("hero-3d-canvas");
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check if Three.js loaded and WebGL is supported
    if (typeof window.THREE === "undefined" || !isWebGLAvailable()) {
      initFallbackCanvas2D(canvas, container, prefersReducedMotion);
      return;
    }

    const THREE = window.THREE;
    const isMobile = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch (err) {
      initFallbackCanvas2D(canvas, container, prefersReducedMotion);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    if (renderer.toneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping || 4;
      renderer.toneMappingExposure = 1.18;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 7.6 : 6.4);

    // Master sculptural rig
    const rig = new THREE.Group();
    scene.add(rig);

    // 1. Primary Forged Core — Precision TorusKnot in Dark Brushed Chrome
    const coreGeo = new THREE.TorusKnotGeometry(
      1.18,
      0.34,
      isMobile ? 110 : 180,
      isMobile ? 20 : 32,
      2,
      3
    );

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#161B24"),
      metalness: 0.92,
      roughness: 0.18
    });

    const coreMesh = new THREE.Mesh(coreGeo, chromeMaterial);
    rig.add(coreMesh);

    // 2. Subtle Precision Wireframe Cage around Core
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#C5F36A"),
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });
    const wireOverlay = new THREE.Mesh(coreGeo, wireMaterial);
    wireOverlay.scale.setScalar(1.012);
    rig.add(wireOverlay);

    // 3. Outer Gimbal Ring 01 — Anodized Gunmetal with Lime Specular Catch
    const outerRingGeo = new THREE.TorusGeometry(
      1.98,
      0.022,
      16,
      isMobile ? 72 : 120
    );
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#262D38"),
      emissive: new THREE.Color("#C5F36A"),
      emissiveIntensity: 0.16,
      metalness: 0.88,
      roughness: 0.22
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI * 0.35;
    outerRing.rotation.y = Math.PI * 0.15;
    rig.add(outerRing);

    // 4. Outer Gimbal Ring 02 — Secondary Orbital Axis
    const secondRingGeo = new THREE.TorusGeometry(
      2.28,
      0.012,
      12,
      isMobile ? 64 : 100
    );
    const secondRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F5F5F0"),
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: 0.32
    });
    const secondRing = new THREE.Mesh(secondRingGeo, secondRingMat);
    secondRing.rotation.x = -Math.PI * 0.28;
    secondRing.rotation.z = Math.PI * 0.22;
    rig.add(secondRing);

    // 5. Faceted Architectural Core Octahedron inside the TorusKnot
    const innerCoreGeo = new THREE.OctahedronGeometry(0.56, 1);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#090B0F"),
      emissive: new THREE.Color("#A6FF4D"),
      emissiveIntensity: 0.22,
      metalness: 0.95,
      roughness: 0.12,
      flatShading: true
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rig.add(innerCore);

    // 6. Floating Orbital Nodes (Precision Coordinate Points)
    const particleCount = isMobile ? 28 : 52;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.1 + Math.random() * 1.15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: new THREE.Color("#C5F36A"),
      size: 0.036,
      transparent: true,
      opacity: 0.65
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    rig.add(particleCloud);

    // Studio Lighting Setup — High Contrast Chrome + Signature Lime Green
    const ambientLight = new THREE.AmbientLight(0xf5f5f0, 0.55);
    scene.add(ambientLight);

    // Key Rim Light (Signature OneForge Lime #C5F36A)
    const limeKeyLight = new THREE.PointLight(0xc5f36a, 5.2, 14);
    limeKeyLight.position.set(3.4, 2.6, 3.2);
    scene.add(limeKeyLight);

    // Secondary Accent Light (#A6FF4D)
    const altLimeLight = new THREE.PointLight(0xa6ff4d, 3.4, 12);
    altLimeLight.position.set(-3.2, -2.4, 2.2);
    scene.add(altLimeLight);

    // Cool Steel Top Fill Light
    const steelDirLight = new THREE.DirectionalLight(0xd8e2f0, 2.2);
    steelDirLight.position.set(-2, 4, 5);
    scene.add(steelDirLight);

    // Deep Rim Backlight
    const backRimLight = new THREE.DirectionalLight(0xc5f36a, 1.4);
    backRimLight.position.set(0, -4, -3);
    scene.add(backRimLight);

    // Interactive State (Mouse + Scroll)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollProgress = 0;
    let isHeroVisible = true;

    window.addEventListener(
      "pointermove",
      function (e) {
        if (prefersReducedMotion) return;
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      function () {
        const vh = Math.max(window.innerHeight, 1);
        scrollProgress = Math.min(Math.max(window.scrollY / vh, 0), 1.5);
      },
      { passive: true }
    );

    // Pause WebGL loop when Hero is offscreen for performance
    if ("IntersectionObserver" in window) {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              isHeroVisible = entry.isIntersecting;
            });
          },
          { threshold: 0.02 }
        );
        observer.observe(heroSection);
      }
    }

    // Responsive Resize
    function onResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      const mobileNow = window.innerWidth < 768;
      camera.aspect = w / h;
      camera.position.z = mobileNow ? 7.6 : 6.4;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", onResize, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isHeroVisible) return;

      const elapsed = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        coreMesh.rotation.y = elapsed * 0.22 + scrollProgress * 1.1;
        coreMesh.rotation.x = elapsed * 0.14 + scrollProgress * 0.45;
        wireOverlay.rotation.copy(coreMesh.rotation);

        innerCore.rotation.y = -elapsed * 0.38;
        innerCore.rotation.z = elapsed * 0.25;

        outerRing.rotation.z = elapsed * 0.18 + scrollProgress * 0.6;
        secondRing.rotation.y = -elapsed * 0.15;
        particleCloud.rotation.y = elapsed * 0.06;

        // Subtle mouse parallax on master rig
        rig.rotation.y = currentMouseX * 0.32;
        rig.rotation.x = currentMouseY * 0.24;
        rig.position.y = Math.sin(elapsed * 0.9) * 0.08 - scrollProgress * 0.35;

        // Dynamic light orbit
        limeKeyLight.position.x = 3.2 + currentMouseX * 1.4;
        limeKeyLight.position.y = 2.4 - currentMouseY * 1.4;
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  /**
   * High-precision 2D Canvas sculptural fallback if WebGL is disabled
   */
  function initFallbackCanvas2D(canvas, container, prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || 600);
    let height = (canvas.height = container.clientHeight || 600);
    let angle = 0;

    window.addEventListener(
      "resize",
      function () {
        width = canvas.width = container.clientWidth || 600;
        height = canvas.height = container.clientHeight || 600;
      },
      { passive: true }
    );

    function drawFallback() {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.32;

      // Subtle Lime Radial Aura
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.35);
      grad.addColorStop(0, "rgba(197, 243, 106, 0.16)");
      grad.addColorStop(0.55, "rgba(17, 21, 27, 0.45)");
      grad.addColorStop(1, "rgba(9, 11, 15, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Orbital Metallic Rings
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle * (0.4 + i * 0.25) + i * 1.05);
        ctx.scale(1, 0.42 + i * 0.18);
        ctx.beginPath();
        ctx.arc(0, 0, radius * (0.85 + i * 0.14), 0, Math.PI * 2);
        ctx.strokeStyle =
          i === 0
            ? "rgba(197, 243, 106, 0.55)"
            : "rgba(245, 245, 240, 0.18)";
        ctx.lineWidth = i === 0 ? 1.75 : 1;
        ctx.stroke();
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        angle += 0.008;
        requestAnimationFrame(drawFallback);
      }
    }

    drawFallback();
  }

  function isWebGLAvailable() {
    try {
      const testCanvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHero3D);
  } else {
    initHero3D();
  }
})();
