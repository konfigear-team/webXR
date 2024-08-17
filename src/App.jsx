import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { XR, XRHitTest, XROrigin, createXRStore } from "@react-three/xr";
import { Suspense, useRef } from "react";
import { Model } from "./Datsun.jsx";
import { Matrix4, Vector3 } from "three";

const matrixHelper = new Matrix4();
const hitTestPosition = new Vector3();

const store = createXRStore({
  hand: {
    right: () => {
      const state = useXRHandState();
      return (
        <>
          <XRHitTest
            space={state.inputSource.targetRaySpace}
            onResults={(results, getWorldMatrix) => {
              console.log(results);

              if (results.length === 0) {
                return;
              }
              getWorldMatrix(matrixHelper, results[0]);
              hitTestPosition.setFromMatrixPosition(matrixHelper);
            }}
          />
        </>
      );
    },
  },
});

function Point() {
  const ref = useRef();
  useFrame(() => ref.current?.position.copy(hitTestPosition));
  return (
    <group ref={ref}>
      <Model />
    </group>
  );
}

export function App() {
  return (
    <>
      <button
        style={{
          position: "absolute",
          zIndex: 10000,
          background: "black",
          borderRadius: "0.5rem",
          border: "none",
          fontWeight: "bold",
          color: "white",
          padding: "1rem 2rem",
          cursor: "pointer",
          fontSize: "1.5rem",
          bottom: "1rem",
          left: "50%",
          boxShadow: "0px 0px 20px rgba(0,0,0,1)",
          transform: "translate(-50%, 0)",
        }}
        onClick={() => store.enterAR()}
      >
        Enter AR
      </button>
      <Canvas style={{ width: "100vw", height: "100vh" }} shadows camera={{ position: [4, 0, 6], fov: 35 }}>
        <XR store={store}>
          <group position={[0, -0.75, 0]}>
            <Suspense>
              <Center top>
                <Point />
              </Center>
            </Suspense>

            <group position={[0, 0, 2.6]}>
              <XROrigin />
            </group>
          </group>
          <OrbitControls />
          <Suspense>
            <Environment preset="dawn" blur={1} />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}
