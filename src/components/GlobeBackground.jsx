
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Globe = () => {
    const meshRef = useRef();
    const groupRef = useRef();

    // Create particles
    const [geo, mat] = useMemo(() => {
        const geometry = new THREE.IcosahedronGeometry(2.5, 4); // Radius 2.5, Detail 4
        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: "#4ca1af", // Teal/Cyanish color for separate distinct look
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });
        return [geometry, material];
    }, []);

    // Frame loop for auto-rotation and mouse interaction
    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime();

        // Auto rotation
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.1; // Smooth slow rotation
        }

        // Mouse parallax (gentle)
        if (meshRef.current) {
            const mouseX = mouse.x * 0.5;
            const mouseY = mouse.y * 0.5;

            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.1);
            meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mouseX, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Particle Sphere */}
            <points args={[geo, mat]} ref={meshRef} />

            {/* Wireframe inner sphere for depth */}
            <Sphere args={[2.45, 16, 16]}>
                <meshBasicMaterial color="#2c3e50" wireframe transparent opacity={0.15} />
            </Sphere>
        </group>
    );
};

const CameraController = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        const isMobile = size.width < 768;
        const targetZ = isMobile ? 12 : 9;

        // Scroll animation to zoom out/move camera
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        tl.to(camera.position, {
            z: targetZ,
            y: -2,
            ease: "power2.out"
        });

        return () => {
            if (ScrollTrigger.getAll()) {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }
        };
    }, [camera, size.width]); // Re-run if width changes

    return null;
}

const GlobeBackground = () => {
    // Initial responsive check for server-side rendering safety (though standard React is client-side)
    const isMobile = window.innerWidth < 768;

    return (
        <div className="globe-canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, isMobile ? 9 : 6], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#0f172a']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                <Globe />
                <CameraController />
            </Canvas>
        </div>
    );
};

export default GlobeBackground;
