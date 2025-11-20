import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import shoeModels from '@/models';

type RenderPreset = {
  label: string;
  shortLabel: string;
  dpr: [number, number];
  rotationSpeed: number;
  tiltSpeed: number;
  floatSpeed: number;
  floatIntensity: number;
  rotationIntensity: number;
  enableBlur: boolean;
  blurRange: [number, number];
  directionalLight: number;
  ambientLight: number;
  environmentPreset: 'city' | 'sunset' | null;
};

export const renderPresets = {
  low: {
    label: 'Low',
    shortLabel: 'LOW',
    dpr: [0.5, 0.9],
    rotationSpeed: 0.18,
    tiltSpeed: 0.05,
    floatSpeed: 1.2,
    floatIntensity: 0.2,
    rotationIntensity: 0.15,
    enableBlur: false,
    blurRange: [0, 0],
    directionalLight: 0.8,
    ambientLight: 0.3,
    environmentPreset: null,
  },
  balanced: {
    label: 'Balanced',
    shortLabel: 'MID',
    dpr: [0.9, 1.3],
    rotationSpeed: 0.3,
    tiltSpeed: 0.1,
    floatSpeed: 1.8,
    floatIntensity: 0.45,
    rotationIntensity: 0.35,
    enableBlur: true,
    blurRange: [2, 10],
    directionalLight: 1,
    ambientLight: 0.5,
    environmentPreset: 'city',
  },
  high: {
    label: 'High',
    shortLabel: 'HIGH',
    dpr: [1, 2],
    rotationSpeed: 0.4,
    tiltSpeed: 0.15,
    floatSpeed: 2.4,
    floatIntensity: 0.6,
    rotationIntensity: 0.5,
    enableBlur: true,
    blurRange: [4, 14],
    directionalLight: 1.2,
    ambientLight: 0.65,
    environmentPreset: 'city',
  },
} as const satisfies Record<string, RenderPreset>;

export type RenderPresetId = keyof typeof renderPresets;

export const renderPresetOrder: RenderPresetId[] = ['low', 'balanced', 'high'];

interface Background3DProps {
  modelUrl: string;
  presetId: RenderPresetId;
  onModelLoaded?: (url: string) => void;
}

const RotatingModel: React.FC<{ modelUrl: string; preset: RenderPreset; onModelLoaded?: (url: string) => void }> = ({ modelUrl, preset, onModelLoaded }) => {
  const modelRef = useRef<THREE.Object3D>(null);
  const { scene } = useGLTF(modelUrl);
  React.useEffect(() => {
    onModelLoaded?.(modelUrl);
  }, [modelUrl, onModelLoaded]);
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
      modelRef.current.rotation.y += delta * preset.rotationSpeed;
      modelRef.current.rotation.x += delta * preset.tiltSpeed;

      const canvasEl = state.gl.domElement;
      if (!canvasEl) return;

      if (preset.enableBlur) {
        // Map the rotation oscillation to blur strength for subtle depth cue.
        const angle = modelRef.current.rotation.y;
        const osc = (Math.sin(angle) + 1) / 2;
        const blurAmount = THREE.MathUtils.lerp(
          preset.blurRange[0],
          preset.blurRange[1],
          1 - osc
        );
        canvasEl.style.filter = `blur(${blurAmount}px)`;
        canvasEl.style.transition = 'filter 0.15s linear';
      } else if (canvasEl.style.filter !== 'none') {
        canvasEl.style.filter = 'none';
      }
    }
  });

  return (
    <Float
      speed={preset.floatSpeed}
      rotationIntensity={preset.rotationIntensity}
      floatIntensity={preset.floatIntensity}
    >
      <primitive
        ref={modelRef}
        object={model}
        scale={autoScale}
        dispose={null}
      />
    </Float>
  );
};

const Background3D: React.FC<Background3DProps> = ({ modelUrl, presetId, onModelLoaded }) => {
  const preset = renderPresets[presetId];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={preset.dpr}>
        <Suspense fallback={null}>
          {preset.environmentPreset && <Environment preset={preset.environmentPreset} />}
          <directionalLight position={[5, 5, 5]} intensity={preset.directionalLight} />
          <ambientLight intensity={preset.ambientLight} />
          <RotatingModel modelUrl={modelUrl} preset={preset} onModelLoaded={onModelLoaded} />
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
