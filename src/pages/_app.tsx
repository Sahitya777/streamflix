import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ClerkProvider
    appearance={{
      baseTheme: dark
    }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  ) 
}
