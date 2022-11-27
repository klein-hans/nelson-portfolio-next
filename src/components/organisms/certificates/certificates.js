import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Certificates({ children, ...props }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 1,
    initialInView: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {}, []);

  return (
    <>
      <motion.div ref={ref} className={props.className} initial="hidden" animate={controls}>
        {children}
      </motion.div>
    </>
  );
}
