import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { usePinchZoom } from "react-use";
import { transform } from "framer-motion";

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

export default function IndexPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <section
          className="text-center px-5 pb-5 pt-1"
          style={{
            backgroundColor: "#b5e0db",
          }}
        >
          <div className="d-flex gap-2 justify-content-end">
            <Link href="/auth/sign-up" className="btn btn-highlight fw-bold">
              SIGN UP
            </Link>
            <Link href="/auth/sign-in" className="btn btn-highlight fw-bold">
              LOGIN
            </Link>
          </div>
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
