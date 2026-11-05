"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface EcosystemCanvas3DProps {
  activeStep?: number;
}

export default function EcosystemCanvas3D({ activeStep = 0 }: EcosystemCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects for gentle mouse rotation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Central 3D Core: Dual-layer Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x9a3f91,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerCore = new THREE.Mesh(outerGeo, outerMat);
    worldGroup.add(outerCore);

    const innerGeo = new THREE.OctahedronGeometry(2.2, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.35,
      shininess: 90,
      transparent: true,
      opacity: 0.55,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    worldGroup.add(innerCore);

    // 2. Orbital Torus Rings
    const ringGeo1 = new THREE.TorusGeometry(7.5, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    worldGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(9.2, 0.03, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    worldGroup.add(ring2);

    // 3. Four 3D Stage Spheres on Orbit
    const nodeSpheres: THREE.Mesh[] = [];
    const nodeColors = [0x9333ea, 0xdb2777, 0x7c3aed, 0x0891b2];
    const orbitRadius = 7.5;

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const sphereGeo = new THREE.SphereGeometry(0.55, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.3,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * 1.5,
        Math.sin(angle) * orbitRadius
      );
      worldGroup.add(sphere);
      nodeSpheres.push(sphere);
    }

    // 4. Stardust Particles Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xdb2777, 1.8, 50);
    pointLight2.position.set(-10, -5, -8);
    scene.add(pointLight2);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = -y * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with IntersectionObserver (0% GPU/CPU when scrolled away)
    let animId: number = 0;
    let clock = new THREE.Clock();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Core rotation
      outerCore.rotation.x = time * 0.25;
      outerCore.rotation.y = time * 0.35;

      innerCore.rotation.x = -time * 0.4;
      innerCore.rotation.y = time * 0.5;

      // Gentle floating bob
      worldGroup.position.y = Math.sin(time * 0.8) * 0.35;

      // Ring rotations
      ring1.rotation.z = time * 0.15;
      ring2.rotation.z = -time * 0.12;

      // Animate 4 orbital node spheres around ring
      nodeSpheres.forEach((sphere, i) => {
        const offset = (i * Math.PI) / 2;
        const currentAngle = time * 0.2 + offset;
        sphere.position.x = Math.cos(currentAngle) * orbitRadius;
        sphere.position.z = Math.sin(currentAngle) * orbitRadius;
        sphere.position.y = Math.sin(time * 1.5 + i) * 1.2;

        // Pulse scale on active step
        const isActive = i === activeStep;
        const targetScale = isActive ? 1.4 + Math.sin(time * 4) * 0.15 : 1;
        sphere.scale.set(targetScale, targetScale, targetScale);
      });

      // Particle system gentle drift
      particleSystem.rotation.y = time * 0.04;

      // Mouse smoothing
      worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause when not visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          clock.start();
          animate();
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial start
    animate();

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [activeStep]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
