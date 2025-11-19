import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import shoeModels from '@/models';

interface Background3DProps {
  modelUrl: string;
}

const RotatingModel: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const modelRef = useRef<THREE.Object3D>(null);
  const { scene } = useGLTF(modelUrl);
  const { model, autoScale } = useMemo(() => {
    const clonedScene = scene.clone(true);
    const normalizedGroup = new THREE.Group();
    normalizedGroup.add(clonedScene);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    // Re-center so the model rotates around the visual middle
    clonedScene.position.sub(center);

    // Scale model so it fills most of the viewport regardless of import scale
    const radius = sphere?.radius ?? 1;
    const desiredRadius = 2.25; // matches camera distance/fov combo
    const scale = radius > 0 ? desiredRadius / radius : 1;

    return { model: normalizedGroup, autoScale: scale };
  }, [scene, modelUrl]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Slow spin
      modelRef.current.rotation.y += delta * 0.3;
      modelRef.current.rotation.x += delta * 0.1;

      // Dynamic Blur Logic
      // We map the sine of the rotation to a blur value.
      // When sin is close to 1 (facing a certain way), blur is low (10%).
      // When sin is close to -1 (facing away), blur is high.
      const angle = modelRef.current.rotation.y;
      const osc = (Math.sin(angle) + 1) / 2; // 0 to 1
      
      // Blur range: 2px (10% roughly) to 12px
      // We invert osc so that at one peak it's clearest
      const blurAmount = 10 * (1 - osc) + 1; 
      
      // Apply filter directly to canvas DOM element for performance
      if (state.gl.domElement) {
         state.gl.domElement.style.filter = `blur(${blurAmount}px)`;
         state.gl.domElement.style.transition = 'filter 0.1s linear';
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive
        ref={modelRef}
        object={model}
        scale={autoScale}
        dispose={null}
      />
    </Float>
  );
};

const Background3D: React.FC<Background3DProps> = ({ modelUrl }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          {/* HDRI Lighting */}
          <Environment preset="city" />
          
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ambientLight intensity={0.5} />
          <RotatingModel modelUrl={modelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;

const priorityModelUrl = shoeModels[0]?.url;
if (priorityModelUrl) {
  // Warm the cache for the hero shoe so it is always available immediately.
  useGLTF.preload(priorityModelUrl);
}

const remainingModelUrls = shoeModels.slice(1).map(({ url }) => url);
let lazyPreloadQueued = false;

export const startLazyShoePreload = () => {
  if (lazyPreloadQueued || remainingModelUrls.length === 0) return;
  lazyPreloadQueued = true;

  const loadRemaining = () => {
    remainingModelUrls.forEach((url, index) => {
      // Stagger requests slightly to avoid fighting with the initial hero load.
      setTimeout(() => useGLTF.preload(url), index * 200);
    });
  };

  if (typeof window !== 'undefined') {
    window.setTimeout(loadRemaining, 400);
  } else {
    loadRemaining();
  }
};
