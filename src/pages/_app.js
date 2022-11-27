import { Landing } from 'components/templates';
import { ThemeProvider } from '@material-tailwind/react';
import 'tailwindcss/tailwind.css';
import 'styles/global.css';
import Head from 'next/head';
import Script from 'next/script';
import { createContext } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo-client';

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js'
        strategy='beforeInteractive'
      />

      <ThemeProvider>
        <Landing>
          <Component {...pageProps} />
        </Landing>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
