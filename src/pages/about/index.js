import { motion } from 'framer-motion';
import { WorkExperience } from 'components/organisms';
import { ScrollMotion } from 'components/molecules';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../../../apollo-client';
import ReactMarkdown from 'react-markdown';
import { getStrapiMedia } from 'lib/media';
import styles from './about.module.css';

const About = ({ careers, certificates }) => {
  return (
    <>
      <NextSeo title='Nelson | About' description='lorem ipsum' />
      <motion.div
        className='grid content-center h-screen '
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <h3 className='font-bebas-neue relative text-9xl text-center font-sans font-bold tracking-tighter text-gray-800 dark:text-white  text-shadow-2xl'>
          WORK
        </h3>
      </motion.div>
      <div className='container mx-auto w-full h-full '>
        <div className='relative wrap overflow-hidden p-10 h-full'>
          <div
            className='-2 absolute border-opacity-20 border-gray-50 bg-gray-50 h-full border'
            style={{ left: '50%' }}
          ></div>
          {careers.map((item, index) => {
            const { jobTitle, employer, description, startDate, endDate } =
              item.attributes;
            const isEven = index % 2 == 0;
            return (
              <div
                key={index}
                className={`mb-8 flex justify-between items-center w-full ${
                  isEven ? 'right-timeline' : 'flex-row-reverse left-timeline'
                }`}
              >
                <div className='order-1 w-5/12'></div>
                <div className='z-20 flex items-center order-1 bg-gray-300 shadow-2xl w-8 h-8 rounded-full'>
                  <h2 className='mx-auto font-semibold text-xs dark:text-black text-white  '>
                    {startDate}
                  </h2>
                </div>
                <WorkExperience
                  className={`${isEven ? 'bg-gray-400' : 'bg-primary-800'}`}
                >
                  <h3 className='font-bold uppercase text-gray-800 text-lg'>
                    {jobTitle}
                  </h3>
                  <h4 className='uppercase text-gray-700 text-sm'>
                    {employer}
                  </h4>
                  <h5 className='mb-3 text-gray-700 text-sm italic'>{`${startDate}-${endDate}`}</h5>
                  <ReactMarkdown
                    children={description}
                    className={`text-sm leading-snug tracking-wide text-gray-900 text-opacity-100 ml-4 ${styles.description}`}
                  />
                </WorkExperience>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <div className='grid h-screen'>
        <motion.div
          className='grid content-center h-screen '
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
        >
          <ScrollMotion>
            <h3 className='font-bebas-neue relative text-9xl text-center font-sans font-bold tracking-tighter text-gray-800 dark:text-white  text-shadow-2xl-dark'>
              CERTIFICATES
            </h3>
          </ScrollMotion>
        </motion.div>
      </div>
      <div className='flex justify-center pb-30'>
        <div className='grid content-center grid-cols-3 gap-4'>
          {certificates.map((item, index) => {
            const { url } = item.attributes;
            return (
              <ScrollMotion duration={index + 0.5} threshold={0}>
                <Image
                  src={getStrapiMedia(url)}
                  alt={`certificates-${index}`}
                  width='300'
                  height='220'
                  className='max-w-xs md:max-w-xs shadow-2xl-dark'
                />
              </ScrollMotion>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const careers = await client.query({
    query: gql`
      query Careers {
        careers {
          data {
            id
            attributes {
              jobTitle
              employer
              description
              startDate
              endDate
            }
          }
        }
      }
    `,
  });

  const documents = await client.query({
    query: gql`
      query {
        document {
          data {
            id
            attributes {
              certificates {
                data {
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
      careers: careers.data.careers.data,
      certificates: documents.data.document.data.attributes.certificates.data,
    },
    revalidate: 1,
  };
}

export default About;
