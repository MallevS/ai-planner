import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong loading the globe.</div>;
        }
        return this.props.children;
    }
}

function EarthSphere() {
    const earthTexture = useTexture('/AI-TRIP-PLANNER/earth.jpg');

    React.useEffect(() => {
        return () => {
            if (earthTexture) {
                earthTexture.dispose();
            }
        };
    }, [earthTexture]);

    return (
        <Sphere args={[1, 32, 32]}>
            <meshPhongMaterial
                map={earthTexture}
                bumpScale={0.1}
                specularMap={earthTexture}
                shininess={100}
                opacity={0.9}
                transparent
            />
        </Sphere>
    );
}

const LoadingFallback = () => (
    <Sphere args={[1, 16, 16]}>
        <meshBasicMaterial color="#123456" wireframe />
    </Sphere>
);

function Globe() {
    return (
        <ErrorBoundary>
            <Canvas
                camera={{ position: [0, 0, 3] }}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: true
                }}
            >
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={<LoadingFallback />}>
                    <EarthSphere />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </ErrorBoundary>
    );
}

export default Globe;