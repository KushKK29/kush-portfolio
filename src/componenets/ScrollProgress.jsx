import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        backgroundColor: "#3498db",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
        zIndex: 50, // Adjust the zIndex as needed
      }}
    />
  );
};
export default ScrollProgress;