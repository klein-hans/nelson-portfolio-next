import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { getStrapiMedia } from "lib/media";

export function ServiceList({ ...props }) {
  const controls = useAnimation();
  const leftVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

  const rightVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

  // const ref = useRef();
  const { ref, inView, entry } = useInView({
    /* Optional options */
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

  useEffect(() => {
    props.service.leftVariants = {
      ...leftVariants,
      visible: {
        ...leftVariants.visible,
        transition: {
          ...leftVariants.visible.transition,
          duration: props.service.duration,
        },
      },
    };
    props.service.rightVariants = {
      ...rightVariants,
      visible: {
        ...rightVariants.visible,
        transition: {
          ...rightVariants.visible.transition,
          duration: props.service.duration,
        },
      },
    };
  }, []);

  return (
    <>
      {props.even ? (
        <div className="flex justify-center text-gray-800 dark:text-white">
          <motion.div
            ref={ref}
            className="mr-12 drop-shadow-lg col-span-2 flex justify-center"
            initial="hidden"
            animate={controls}
            variants={props.service.leftVariants}
          >
            <Image
              loading="eager"
              src={getStrapiMedia(props.service.imageUrl)}
              width="300"
              height="300"
              className="max-w-xs md:max-w-xs rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div
            ref={ref}
            className="grid content-center w-80"
            initial="hidden"
            animate={controls}
            variants={props.service.rightVariants}
          >
            <h4 className="text-md font-bold uppercase text-primary-500">{props.service.name}</h4>
            <p>{props.service.description}</p>
          </motion.div>
        </div>
      ) : (
        <div className="flex justify-center text-gray-800 dark:text-white">
          <motion.div
            ref={ref}
            className="mr-12 grid content-center w-80"
            initial="hidden"
            animate={controls}
            variants={props.service.leftVariants}
          >
            <h4 className="text-md font-bold uppercase text-primary-500">{props.service.name}</h4>
            <p>{props.service.description}</p>
          </motion.div>
          <motion.div
            ref={ref}
            className="drop-shadow-lg col-span-2 flex justify-center"
            initial="hidden"
            animate={controls}
            variants={props.service.rightVariants}
          >
            <Image
              src={getStrapiMedia(props.service.imageUrl)}
              width="300"
              height="300"
              className="max-w-xs md:max-w-xs rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
