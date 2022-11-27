import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function WorkExperience({ children, ...props }) {
  const controls = useAnimation();
  const leftVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

  const rightVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

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

  return (
    <>
      <motion.div
        ref={ref}
        className={`${props.className} order-1 shadow-2xl-dark  w-5/12 px-6 py-4`}
        initial="hidden"
        animate={controls}
        variants={props.even ? leftVariants : rightVariants}
      >
        {children}
      </motion.div>
    </>
  );
}
