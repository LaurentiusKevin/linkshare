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
import BottomNavbar from "../Components/Navbar/BottomNavbar";

import {
  faBurger,
  faCartShopping,
  faEnvelope,
  faFontAwesome,
  faLocationDot,
  faPhone,
  fas,
  faShop,
  faCamera,
  faChevronLeft,
  faCog,
  faFile,
  faHomeAlt,
  faLayerGroup,
  faPlus,
  faUser,
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
import { AnimatePresence, motion } from "framer-motion";

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

const animationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

function MyApp({ Component, pageProps, props}) {

  const router = useRouter();

  let listUrl = [
    "/pages/edit",
    "/settings",
    "/pages/add",
    "/dashboard",
    "/pages/edit/",
    "/"
  ];

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
    "fa-solid fa-globe",
    "fa-solid fa-message",
  ];

  props = {
    ...props,
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
        <AnimatePresence>
            
  {pageProps?.isLoggedIn ? ( 
      
        <motion.div
              variants={animationVariants}
              initial="hidden"
              animate="show"
            >
              {(listUrl.includes(router.pathname) ||
                router.pathname.includes("/pages/edit/")) && (  
                  <div
                    id="footer-bar"
                    class="col-lg-5 col-md-6 m-auto footer-bar-6"
                  >
                    <BottomNavbar
                      href="/dashboard"
                      title="Dashboard "
                      active-class="active-nav"
                      icon={faHomeAlt}
                      urlPath={pageProps.asPath}
                    />
                    <BottomNavbar
                      href="/pages/add"
                      title="Create Page"
                      className="circle-nav"
                      active-class="active-nav"
                      iconColor="white"
                      icon={faPlus}
                      urlPath={pageProps.asPath}
                      circleNav={true}
                    />
                    <BottomNavbar
                      href="/settings"
                      title="Settings"
                      active-class="active-nav"
                      icon={faCog}
                      urlPath={pageProps.asPath}
                    />
                  </div>
                  
                )}
              <Component {...pageProps} />
            </motion.div>
    
    ) : (
      <Component {...pageProps} />
    )}
        </AnimatePresence>
      </QueryClientProvider>
    </React.Fragment>
  );
}
export async function getServerSideProps(context) {
  let user = getCurrentUser(context);  
  return {
    pageProps: { isLoggedIn: user !== null },
  };
}
export default MyApp;
