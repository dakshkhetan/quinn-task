import { useState, useLayoutEffect } from "react";

const getDimensions = () => ({
  height: window.innerHeight,
  width: window.innerWidth
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getDimensions());

  useLayoutEffect(() => {
    function onResize() {
      setWindowSize(getDimensions());
    }
    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
