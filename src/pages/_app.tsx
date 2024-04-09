import Layout from "@/components/layouts/toasts";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import type { AppProps } from "next/app";

export const theme = extendTheme({
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _disabled: {
            background: "#676D9A1A",
            opacity: "100%",
            cursor: "pointer",
          },
          "> *:first-of-type": {
            background: "#676D9A1A",
            opacity: "100%",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        icon: {
          bg: "#4D59E8",
          color: "white",
          borderWidth: "0px",
          _disabled: {
            borderWidth: "0px",
            padding: "0px",
            color: "#4D59E8",
            bg: "#4D59E8",
            colorScheme: "#4D59E8",
          },
        },
        control: {
          borderRadius: "base",
          _disabled: {
            borderWidth: "0px",
            padding: "0px",
            color: "black",
            bg: "#4D59E8",
          },
        },
      },
    },
  },

  colors: {
    customBlue: {
      500: "#0969DA",
    },
    customPurple: {
      500: "#4D59E8",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider theme={theme}>
      <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </ChakraProvider>
  ) 
}
