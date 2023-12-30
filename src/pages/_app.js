"use client"; 
import "@/styles/globals.css"; 
import '@/styles/main_style.scss';
import { wrapper } from "@/store";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
