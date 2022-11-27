import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { ScrollMotion } from 'components/molecules';
import Button from 'components/atoms/button/index.js';
import { getStrapiMedia } from 'lib/media';
import { gql } from '@apollo/client';
import client from '../../apollo-client';

const Home = ({ services, resume }) => {
  const resumeUrl = resume.attributes.resume.data.attributes.url;

  return (
    <>
      <NextSeo title='Nelson | Home' description='lorem ipsum' />
      <div className='h-screen mx-auto px-6 items-center grid grid-cols-6 relative py-12 mb-32'>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
          className='col-span-2 relative ml-24 '
        >
          <Image
            loading='eager'
            alt='profile'
            width='200'
            height='200'
            src='/static/images/profile-3.png'
            // layout="responsive"
            // sizes="100vw"
            className='float-left rounded-full'
          />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
          className='col-span-4 relative z-20'
        >
          <h1 className='font-bebas-neue text-shadow-2xl uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800'>
            NELSON ESCUTON
            <span className='text-2xl sm:text-2xl'>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(500)
                    .typeString('I am an Admin Manager')
                    .pauseFor(1500)
                    .changeDeleteSpeed(5)
                    .deleteChars(13)
                    .typeString('Amazon FBA Specialist')
                    .pauseFor(1500)
                    .start();
                }}
                options={{
                  delay: 40,
                  loop: true,
                }}
              />
            </span>
          </h1>
        </motion.div>
      </div>

      <div className='mb-52 pb-12 shadow-3xl'>
        <ScrollMotion threshold={0} className='grid content-center'>
          <h3 className='font-bebas-neue relative text-5xl text-center font-sans font-bold tracking-tighter text-gray-800 dark:text-white text-shadow-lg'>
            SERVICES
          </h3>
        </ScrollMotion>
        <div className='mt-24 sm:flex flex-wrap justify-center items-center text-center gap-10 p-15'>
          {services.map((item, index) => {
            const { name, description, icon } = item.attributes;
            const { url: iconUrl } = icon.data.attributes;
            return (
              <ScrollMotion
                key={index}
                duration={index + 0.5}
                threshold={0}
                className='w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6 shadow-2xl-dark dark:bg-neutral-800'
              >
                {/* <div  */}
                <div className='flex-shrink-0'>
                  <div className='flex items-center mx-auto justify-center h-12 w-12 rounded-md'>
                    <Image
                      alt={name}
                      width='50'
                      height='50'
                      src={getStrapiMedia(iconUrl)}
                      className='float-left max-w-xs md:max-w-xs m-auto text-white'
                    />
                  </div>
                </div>
                <h3 className='text-lg sm:text-xl text-gray-700 font-semibold dark:text-white py-4'>
                  {name}
                </h3>
                <p className='text-sm  text-gray-500 dark:text-gray-300 py-4'>
                  {description}
                </p>
                {/* </div> */}
              </ScrollMotion>
            );
          })}
        </div>
        <ScrollMotion threshold={0} className='grid content-center my-12'>
          <Button
            type='link'
            href='/services'
            color='primary'
            className='py-4 px-6 text-neutral-800 w-44 mx-auto mb-50'
            // className="py-4 px-6 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-indigo-200 text-neutrral-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            See All Services
          </Button>
        </ScrollMotion>
      </div>

      <div className='mt-20 bg-white dark:bg-neutral-800 shadow-2xl-dark'>
        <div className='lg:flex lg:items-center lg:justify-evenly w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20'>
          <h2 className='text-3xl font-extrabold text-black dark:text-white sm:text-4xl'>
            <span className='block'>LETS WORK TOGETHER</span>
            <span className='block text-primary-500 text-lg'>
              Make your business grow and visible to customers.
            </span>
          </h2>
          <div className='lg:mt-0 lg:flex-shrink-0'>
            <div className=' inline-flex rounded-md shadow'>
              <Button
                type='download'
                href={getStrapiMedia(resumeUrl)}
                filename={'Nelson Escuton - CV'}
                color='primary'
                className='py-4 px-6 text-neutral-800'
                // className="py-4 px-6 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-indigo-200 text-neutrral-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                DOWNLOAD CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const services = await client.query({
    query: gql`
      query Services {
        services {
          data {
            id
            attributes {
              name
              description
              icon {
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

  const document = await client.query({
    query: gql`
      query {
        document {
          data {
            id
            attributes {
              resume {
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
      services: services.data.services.data,
      resume: document.data.document.data,
    },
    revalidate: 1,
  };
}

export default Home;
