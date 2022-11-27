import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceList } from "components/organisms";
import { NextSeo } from "next-seo";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

const Services = ({ services }) => {
  return (
    <>
      <NextSeo title="Nelson | Contact" description="lorem ipsum" />
      <motion.div
        className="grid content-center h-screen "
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <h3 className="font-bebas-neue relative text-9xl text-center font-sans font-bold tracking-tighter text-gray-800 dark:text-white text-shadow-2xl">
          SERVICES
        </h3>
      </motion.div>

      {services.map((item, index) => {
        const { name, description, image } = item.attributes;
        const { url: imageUrl } = image.data.attributes;

        const duration = 1 * (1 + index);
        return (
          <ServiceList
            service={{ name, description, imageUrl, duration }}
            even={index % 2 == 0}
            key={index}
          />
        );
      })}
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Services {
        services {
          data {
            id
            attributes {
              name
              description
              image {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      services: data.services.data,
    },
    revalidate: 1,
  };
}

export default Services;
