/* eslint-disable react/no-unknown-property -- react-three-fiber JSX (position, args, …) */
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Float, Html, RoundedBox, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { FiBookOpen, FiBriefcase, FiCpu, FiFolder, FiMail, FiUser } from "react-icons/fi";
import { SECTIONS } from "./Header";
import { skillCards } from "./Skills";
import { experience } from "./Experience";
import { education } from "./Education";

const OVERVIEW_POS = new THREE.Vector3(0, 0, 13.5);
const ORIGIN = new THREE.Vector3(0, 0, 0);

// The site's three sanctioned accents (Signal Blue, Console Cyan, Online
// Emerald) — cycled across cards instead of introducing new hues.
const ACCENTS = ["#3b82f6", "#22d3ee", "#10b981"];
const SECTION_ICONS = {
  intro: FiUser,
  skills: FiCpu,
  projects: FiFolder,
  education: FiBookOpen,
  experience: FiBriefcase,
  contact: FiMail,
};

// Shallow two-row arc facing the camera, so every label is readable
// from the overview position.
const PANELS = SECTIONS.map((s, i) => {
  const col = i % 3; // 0..2
  const row = i < 3 ? 1 : -1;
  const x = (col - 1) * 5.4;
  const position = new THREE.Vector3(x, row * 1.9, -Math.abs(x) * 0.35);
  return {
    ...s,
    position,
    rotationY: -x * 0.05, // angled slightly inward
    // native3d showcases (dial, card cascades) need a wider shot than a panel
    cameraPos: position
      .clone()
      .add(new THREE.Vector3(x * 0.06, 0.25, s.native3d ? 6.8 : 4.3)),
    accent: ACCENTS[i % ACCENTS.length],
    Icon: SECTION_ICONS[s.id],
  };
});

// Drifting near-field particles that parallax and swirl with the pointer.
const ParticleField = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(1800 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      // hollow-ish shell so particles surround the panels without crowding them
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.cos(phi) * 0.6;
      arr[i + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      state.pointer.y * 0.25,
      0.04
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      -state.pointer.x * 0.2,
      0.04
    );
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#93c5fd"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Panel = ({ panel, focused, onFocus }) => {
  const [hovered, setHovered] = useState(false);
  const inner = useRef();
  const material = useRef();
  const { Icon, accent } = panel;
  // tilt the card toward the cursor while hovered — composes with the
  // group's base rotation since it lives on an inner wrapper
  useFrame((state) => {
    if (!inner.current) return;
    inner.current.rotation.x = THREE.MathUtils.lerp(
      inner.current.rotation.x,
      hovered ? -state.pointer.y * 0.35 : 0,
      0.12
    );
    inner.current.rotation.y = THREE.MathUtils.lerp(
      inner.current.rotation.y,
      hovered ? state.pointer.x * 0.4 : 0,
      0.12
    );
    const s = THREE.MathUtils.lerp(
      inner.current.scale.x,
      hovered ? 1.12 : 1,
      0.12
    );
    inner.current.scale.setScalar(s);
    inner.current.position.z = THREE.MathUtils.lerp(
      inner.current.position.z,
      hovered ? 0.6 : 0,
      0.12
    );
    // breathing glow so idle cards still read as "live", brighter on hover
    if (material.current) {
      const breathe = 0.22 + Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
      material.current.emissiveIntensity = THREE.MathUtils.lerp(
        material.current.emissiveIntensity,
        hovered ? 0.85 : breathe,
        0.12
      );
    }
  });
  return (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.35}>
      <group
        position={panel.position}
        rotation-y={panel.rotationY}
        onClick={(e) => {
          e.stopPropagation();
          onFocus(panel.id);
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <group ref={inner}>
          <RoundedBox args={[3.6, 2, 0.2]} radius={0.07}>
            <meshPhysicalMaterial
              ref={material}
              color="#0b1220"
              transparent
              opacity={0.55}
              emissive={accent}
              emissiveIntensity={0.22}
              metalness={0.15}
              roughness={0.2}
              clearcoat={0.6}
            />
          </RoundedBox>

          {/* the icon is a real DOM element CSS-scaled to the 3D camera —
              hide it once focused so it doesn't blow up into a blurry
              close-up blob behind the content panel */}
          {!focused && (
            <Html
              transform
              occlude={false}
              position={[0, 0.62, 0.09]}
              style={{ pointerEvents: "none" }}
            >
              <Icon
                size={30}
                color={accent}
                style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
              />
            </Html>
          )}

          {!focused && (
            <>
              <Text position={[0, -0.08, 0.12]} fontSize={0.4} color="#f1f5f9">
                {panel.label}
              </Text>
              <Text position={[0, -0.55, 0.12]} fontSize={0.16} color={accent}>
                click to explore
              </Text>
            </>
          )}
        </group>
      </group>
    </Float>
  );
};

// ---------- native-3D section showcases ----------

const DIAL_GRAY = new THREE.Color("#9ca3af");
const DIAL_CYAN = new THREE.Color("#22d3ee");
const SKILL_NAMES = skillCards.map((s) => s.name);

// Rotating instrument dial: skill names ride a cylinder; whichever faces
// the camera lights up Console Cyan and grows, like a tuned-in readout.
const SkillsDial = ({ position }) => {
  const ring = useRef();
  const texts = useRef([]);
  const tmp = useRef(new THREE.Color());
  const n = SKILL_NAMES.length;
  useFrame((_, delta) => {
    if (!ring.current) return;
    ring.current.rotation.y += delta * 0.35;
    const rot = ring.current.rotation.y;
    texts.current.forEach((t, i) => {
      if (!t) return;
      const a = (i / n) * Math.PI * 2;
      const front = (Math.cos(a + rot) + 1) / 2; // 1 = facing the camera
      const f = front ** 3;
      t.scale.setScalar(0.85 + f * 0.55);
      t.color = tmp.current.copy(DIAL_GRAY).lerp(DIAL_CYAN, f).getStyle();
      // fade the far side out so its mirrored backs don't read as noise
      t.fillOpacity = 0.08 + 0.92 * front ** 1.5;
    });
  });
  return (
    <group position={position}>
      <Text position={[0, 1.7, 0]} fontSize={0.34} color="#f1f5f9">
        Technical Skills
      </Text>
      <group ref={ring} rotation-x={-0.08}>
        {SKILL_NAMES.map((name, i) => {
          const a = (i / n) * Math.PI * 2;
          return (
            <Text
              key={name}
              ref={(el) => (texts.current[i] = el)}
              position={[Math.sin(a) * 3.2, 0, Math.cos(a) * 3.2]}
              rotation-y={a}
              fontSize={0.28}
              color="#9ca3af"
            >
              {name}
            </Text>
          );
        })}
        {[-0.9, 0.9].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[3.2, 0.012, 8, 80]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Glass cards receding into space — shared by Experience and Education.
const CascadeCards = ({ position, title, items }) => (
  <group position={position}>
    <Text position={[0, 2.2, 0]} fontSize={0.34} color="#f1f5f9">
      {title}
    </Text>
    {/* no Float here: cards hold still so their links are easy to click */}
    {items.map((item, i) => (
        <group
          key={i}
          position={[
            i * 2.15 - ((items.length - 1) * 2.15) / 2,
            0.95 - i * 0.55,
            -i * 1.3,
          ]}
          rotation-y={-0.1}
        >
          <Html transform scale={0.42} style={{ pointerEvents: "auto" }}>
            <div
              className="cascade-card w-80 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              style={{ animationDelay: `${i * 120}ms`, minHeight: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
                  {item.duration}
                </p>
                <h3 className="text-white font-semibold text-lg leading-snug mb-2">
                  {item.heading}
                </h3>
                <p className="text-cyan-300 text-sm mb-3">{item.subheading}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.summary}
                </p>
              </div>
              {item.caseStudy && (
                <a
                  href={`/work/${item.caseStudy}`}
                  className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  Read the full case study →
                </a>
              )}
            </div>
          </Html>
        </group>
    ))}
  </group>
);

const EXPERIENCE_CARDS = experience.map((e) => ({
  duration: e.duration,
  heading: e.title,
  subheading: e.company,
  summary: e.details[0],
  caseStudy: e.caseStudy,
}));

const EDUCATION_CARDS = education.map((e) => ({
  duration: e.duration,
  heading: e.degree,
  subheading: e.institution,
  summary: e.details[0],
}));

const CameraRig = ({ focus }) => {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const target = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer }) => {
    const panel = PANELS.find((p) => p.id === focus);
    target.current.copy(panel ? panel.cameraPos : OVERVIEW_POS);
    if (!panel) {
      // subtle mouse parallax at the overview
      target.current.x += pointer.x * 1.4;
      target.current.y += pointer.y * 0.9;
    }
    camera.position.lerp(target.current, 0.06);
    look.current.lerp(panel ? panel.position : ORIGIN, 0.08);
    camera.lookAt(look.current);
  });
  return null;
};

const Scene3D = ({ focus, onFocus }) => (
  <Canvas
    dpr={[1, 1.75]}
    camera={{ position: OVERVIEW_POS.toArray(), fov: 50 }}
    onPointerMissed={() => onFocus(null)}
  >
    <color attach="background" args={["#0f172a"]} />
    <ambientLight intensity={0.7} />
    <pointLight position={[6, 8, 6]} intensity={60} />
    <Stars radius={60} depth={40} count={2500} factor={4} fade speed={0.6} />
    <ParticleField />

    {/* centerpiece, tucked behind the panel rows */}
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh position={[0, 0, -4]}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color="#3b82f6" wireframe />
      </mesh>
    </Float>
    <Billboard position={[0, -4.4, 0]}>
      <Text fontSize={0.55} color="#e2e8f0">
        Kush Goel
      </Text>
      <Text position={[0, -0.65, 0]} fontSize={0.22} color="#94a3b8">
        Full Stack Developer
      </Text>
    </Billboard>

    {PANELS.map((p) =>
      // native3d sections swap their panel for an in-scene showcase on focus
      p.native3d && p.id === focus ? null : (
        <Panel
          key={p.id}
          panel={p}
          focused={p.id === focus}
          onFocus={onFocus}
        />
      )
    )}

    {focus === "skills" && (
      <SkillsDial position={PANELS.find((p) => p.id === "skills").position} />
    )}
    {focus === "experience" && (
      <CascadeCards
        position={PANELS.find((p) => p.id === "experience").position}
        title="Experience"
        items={EXPERIENCE_CARDS}
      />
    )}
    {focus === "education" && (
      <CascadeCards
        position={PANELS.find((p) => p.id === "education").position}
        title="Education"
        items={EDUCATION_CARDS}
      />
    )}

    <CameraRig focus={focus} />
  </Canvas>
);

export default Scene3D;
