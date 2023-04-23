import App, { AppProps } from 'next/app';
import { ReactNode, useContext } from 'react';
import '../styles/globals.css';
import AppProvider from '../context/state';

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return getLayout(
    <Component {...pageProps} />
  )
}
