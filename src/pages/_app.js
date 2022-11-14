import React, { useState } from "react";
// import "../../styles/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/style.css";
import "../../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const { asPath, back } = useRouter();
  const [pageInfo, setPageInfo] = useState({
    title: "Solutech PWA Demo NextJs",
  });
  const queryClient = new QueryClient();

  pageProps = {
    ...pageProps,
    pageInfo,
    setPageInfo,
    router: {
      asPath,
      back,
    },
  };

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default MyApp;
