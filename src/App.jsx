import { Canvas, createPortal, useThree } from "@react-three/fiber";
import { createXRStore, XR, XRDomOverlay, XROrigin } from "@react-three/xr";
import { Suspense, useState } from "react";
import { Box } from "@react-three/drei";

const store = createXRStore();

export function App() {
  const [bool, setBool] = useState(false);
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas style={{ width: "100vw", flexGrow: 1, height: "100vh" }}>
        <XR store={store}>
          <XROrigin />

          <XRDomOverlay style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: bool ? "red" : "green", padding: "1rem 2rem" }} onClick={() => setBool((b) => !b)}>
              Hello World
            </div>
          </XRDomOverlay>
          <Suspense fallback={null}>
            <Box position={[0, 0, 0]} scale={3} />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}
