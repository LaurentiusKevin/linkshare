import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faHandPointRight, faShare, faUpload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import {
  authSignIn,
  authSignOut,
  getCurrentUser,
} from "../Config/FirebaseAuthentication";
import { faFacebook, faTiktok, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { usePinchZoom, useSessionStorage } from "react-use";
import { transform } from "framer-motion";
import { useEffect, useState } from 'react'

const defaultBrancBusinessSection = [
  {
    url: "/images/logos/shopee.png",
    alt: "shopee-icon",
  },
  {
    url: "/images/logos/tokopedia.png",
    alt: "tokopedia-icon",
  },
  {
    url: "/images/logos/lazada.png",
    alt: "lazada-icon",
  },
];

export default function IndexPage(props) {

  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // function handleLogin() {
  //   // Lakukan login, dan set isLoggedIn ke true jika login berhasil
  //   setIsLoggedIn(true)
  // }
  // function handleLogout() {
  //   // Lakukan logout, dan set isLoggedIn ke false jika logout berhasil
  //   setIsLoggedIn(false)
  // }

  // useEffect(() => {
  //     let user = getCurrentUser(context);

  //     if (user !== null) {
  //       setIsLoggedIn(true)
  //     }

  // })
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="mb-3">
          {props.isLoggedIn && (
            <button onClick={() => handleLogout()}></button>
          )}
          {props.isLoggedIn && <p></p>}
        </div>
        <section
          className="text-center px-5 pb-5 pt-1"
          style={{
            backgroundColor: "#b5e0db",
          }}
        >
          <div className="scale">
            <Image
              className="img-fluid rounded-5 mt-5"
              src="/images/framework/home-image.png"
              style={transform}
              width={500}
              height={500}
            />
          </div>
          <div className="h4 fw-bold text-dark">
            <span className="text-primary-custom">
              Create more links with one - pages link
            </span>
          </div>
          <Link href="/auth/sign-up" className="fw-bold">
            <Image
              className="img-fluid rounded-5"
              src="/images/framework/home-illustration.png"
              alt="phone-preview"
              width={400}
              height={400}
              relative
            />
          </Link>
        </section>
        <div className="bg-white text-center">
          <Link href="https://facebook.com" className="fw-bold m-2">
            <FontAwesomeIcon
              className="color-teal-dark mb-5 mt-5"
              icon={faFacebook}
              size="2x"
            />
          </Link>
          <Link href="https://twitter.com" className="fw-bold m-2">
            <FontAwesomeIcon
              className="color-teal-dark mb-5 mt-5"
              icon={faTwitter}
              size="2x"
            />
          </Link>
          <Link href="https://web.whatsapp.com" className="fw-bold m-2">
            <FontAwesomeIcon
              className="color-teal-dark mb-5 mt-5"
              icon={faWhatsapp}
              size="2x"
            />
          </Link>
        </div>
        <div className="bg-gray text-center">
          <table>
            <tr>
              <td width={150}>
                <Link href="#" className="fw-bold">
                  Privacy Policy
                </Link>
              </td>
              <td width={150}>
                <Link href="#" className="fw-bold">
                  Term Of service
                </Link>
              </td>
              <td width={150}>
                <Link href="#" className="fw-bold">
                  Contact Support
                </Link>
              </td>
            </tr>
          </table>
        </div>
        {/*<section className="bg-gradient-2 p-5">*/}
        {/*  <p className="h3 text-secondary mb-3">Business</p>*/}
        {/*  <p className="h1 fw-bold text-dark mb-3">*/}
        {/*    One link to connect <br /> all your{" "}*/}
        {/*    <span className="text-primary-gradient">businesses</span>*/}
        {/*  </p>*/}
        {/*  <p className="h6 mb-5">*/}
        {/*    Link your business and <br /> marketplace in one page.*/}
        {/*  </p>*/}
        {/*  <div className="d-flex justify-content-center gap-2">*/}
        {/*    {defaultBrancBusinessSection.map((item, key) => (*/}
        {/*      <div*/}
        {/*        key={`business-brand-section-${key}`}*/}
        {/*        className="card card-style p-2"*/}
        {/*      >*/}
        {/*        <Image*/}
        {/*          src={item.url}*/}
        {/*          alt={item.alt}*/}
        {/*          width={40}*/}
        {/*          height={40}*/}
        {/*          relative*/}
        {/*          className="img-fluid"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let user = getCurrentUser(context);

  // if (user !== null) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       // destination: "/pages/add",
  //     },
  //   };
  // }

  return {
    props: {isLoggedIn : user !== null},
  };
}
