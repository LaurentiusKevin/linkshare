import { Html, Main, Head, NextScript } from "next/document";
import BottomNavbar from "../Components/Navbar/BottomNavbar";
import {
  faCamera,
  faChevronLeft,
  faCog,
  faFile,
  faHomeAlt,
  faLayerGroup,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DefaultDocument(props) {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/icon/solutech-pwanextjs-36x36.png" />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icon/solutech-pwanextjs-72x72.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
        {/*<link rel="manifest" href="/manifest.json" />*/}
      </Head>
      <body className="theme-light">
        {/*<div id="swup">*/}
        {/*  <div className="spinner-border color-highlight" role="status"></div>*/}
        {/*</div>*/}
        <div id="page">
          <div className="header header-fixed header-logo-center">
            <Link href="/" className="header-title">
              {props?.pageInfo?.title ?? "Starter"}
            </Link>
            <a href="/dashboard" className="header-icon header-icon-1">
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            <a
              href="#"
              data-menu="menu-main"
              className="header-icon header-icon-4"
            >
              <i className="fas fa-bars"></i>
            </a>
            <a
              href="#"
              className="header-icon header-icon-3 show-on-theme-dark"
            >
              <i className="fas fa-sun"></i>
            </a>
            <a
              href="#"
              className="header-icon header-icon-3 show-on-theme-light"
            >
              <i className="fas fa-moon"></i>
            </a>
          </div>

          <div id="footer-bar" className="footer-bar-6">
            <BottomNavbar
              href="/dashboard"
              title="Dashboard "
              icon={faHomeAlt}
              urlPath={props.asPath}
            />
            <BottomNavbar
              href="/pages/add"
              title="Create Page"
              className="circle-nav"
              iconColor="white"
              icon={faPlus}
              urlPath={props.asPath}
              circleNav={true}
            />
            <BottomNavbar
              href="/settings"
              title="Settings"
              icon={faCog}
              urlPath={props.asPath}
            />
          </div>

          <div className="page-content header-clear-medium">
            <Main />
            <NextScript />
          </div>
        </div>
        <div data-menu-load="menu-footer.html"></div>
        {/*<Script*/}
        {/*  id="bootstrap-script"*/}
        {/*  src="/scripts/bootstrap.min.js"*/}
        {/*  strategy="afterInteractive"*/}
        {/*/>*/}
        {/*<Script*/}
        {/*  id="global-custom-script"*/}
        {/*  src="/scripts/custom.js"*/}
        {/*  strategy="afterInteractive"*/}
        {/*/>*/}
      </body>
    </Html>
  );
}
