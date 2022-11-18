import React, { useState } from "react";
// import "../../styles/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/style.css";
import "../../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const { asPath, back } = useRouter();
  const [pageInfo, setPageInfo] = useState({
    title: "Solutech PWA Demo NextJs",
  });
  const queryClient = new QueryClient();
  const MySwal = withReactContent(Swal);

  pageProps = {
    ...pageProps,
    pageInfo,
    setPageInfo,
    router: {
      asPath,
      back,
    },
    MySwal,
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
