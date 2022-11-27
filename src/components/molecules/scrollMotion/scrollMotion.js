import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ScrollMotion({ children, ...props }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: props.threshold ?? 1,
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
  const variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: props.duration || 1,
      },
    },
  };

  return (
    <>
      <motion.div
        ref={ref}
        className={props.className}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    </>
  );
}
