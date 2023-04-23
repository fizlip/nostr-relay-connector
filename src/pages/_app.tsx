import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { ReactNode, useContext } from 'react';
import type { NextComponentType } from 'next';
import '../styles/globals.css';
import AppProvider from '../context/state';

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return getLayout(<Component {...pageProps} />);
};

export default App;