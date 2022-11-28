import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/style.css";
import "../../styles/globals.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import {
  faBurger,
  faCartShopping,
  faEnvelope,
  faFontAwesome,
  faLocationDot,
  faPhone,
  fas,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import {
  fab,
  faFacebook,
  faInstagram,
  faLinkedin,
  faShopify,
  faTiktok,
  faTwitter,
  faWordpress,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(
  faFontAwesome,
  fas,
  fab,
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faTiktok,
  faWordpress,
  faBurger,
  faCartShopping,
  faShopify,
  faPhone,
  faLocationDot,
  faYoutube,
  faShop,
  faEnvelope
);

function MyApp({ Component, pageProps }) {
  const { asPath, back } = useRouter();
  const [pageInfo, setPageInfo] = useState({
    title: "Solutech PWA Demo NextJs",
    domain: "",
  });
  const queryClient = new QueryClient();
  const MySwal = withReactContent(Swal);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const iconList = [
    "fa-solid fa-phone",
    "fab fa-facebook",
    "fab fa-twitter",
    "fab fa-linkedin",
    "fab fa-instagram",
    "fab fa-tiktok",
    "fab fa-wordpress",
    "fa-solid fa-burger",
    "fab fa-shopify",
    "fa-solid fa-location-dot",
    "fab fa-youtube",
    "fa-solid fa-shop",
    "fa-solid fa-envelope",
  ];

  pageProps = {
    ...pageProps,
    pageInfo,
    setPageInfo,
    router: {
      asPath,
      back,
    },
    MySwal,
    iconList,
    Toast,
  };

  useEffect(() => {
    setPageInfo({
      ...pageInfo,
      domain: window.location.hostname,
    });
  }, []);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default MyApp;
