import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import landingRoutes from 'routes';

export function Navbar() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/services',
      name: 'Services',
    },
    {
      path: '/about',
      name: 'About Me',
    },
    {
      path: '/contact',
      name: 'Contact',
    },
  ];

  return (
    <header className='bg-transparent absolute h-20 flex items-center justify-start lg:justify-center z-30 w-full'>
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <div className='flex items-center'>
          <nav
            className={`font-sans text-neutral-800 dark:text-white uppercase text-lg lg:flex items-center lg:relative fixed top-0 mx-10 my-4 transition-opacity duration-300 ease-in opacity-100 ${
              toggle && 'opacity-0'
            }`}
          >
            {routes.map((route, index) => {
              return (
                <Link
                  key={index}
                  href={route.path}
                  className={`py-2 mx-5 flex text-xs hover:no-underline hover:text-primary-800 hover:font-medium transition ease-out duration-500 ${
                    router.pathname === route.path
                      ? 'border-b-2 border-b-cyan-400 text-primary-300'
                      : ''
                  }`}
                >
                  {route.name}
                </Link>
              );
            })}
          </nav>
          <button
            className='lg:hidden flex flex-col ml-4'
            onClick={() => setToggle(!toggle)}
          >
            <span className='w-6 h-1 bg-gray-800 dark:bg-white mb-1'></span>
            <span className='w-6 h-1 bg-gray-800 dark:bg-white mb-1'></span>
            <span className='w-6 h-1 bg-gray-800 dark:bg-white mb-1'></span>
          </button>
        </div>
      </motion.div>
    </header>
  );
}
