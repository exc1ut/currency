import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store, { persistor } from "../app/store";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
