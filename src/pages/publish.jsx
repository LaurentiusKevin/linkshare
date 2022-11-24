import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faRocket } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLine,
  faTiktok,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PublishPage(props) {
  const { Toast } = props;

  const router = useRouter();
  const [domainName, setDomainName] = useState("");
  const [confettiConfig, setConfettiConfig] = useState({
    width: 0,
    height: 0,
    numberOfPieces: 100,
    run: true,
    recycle: true,
    gravity: 0.05,
    friction: 1,
  });

  useEffect(() => {
    setDomainName(window.location.host + "/pages/" + router.query.page);
    const { innerWidth: width, innerHeight: height } = window;
    setConfettiConfig({
      ...confettiConfig,
      width: width,
      height: height,
    });

    let confettyId = setTimeout(() => {
      setConfettiConfig({
        ...confettiConfig,
        run: false,
      });
    }, 5000);

    return () => clearTimeout(confettyId);
  }, []);

  return (
    <div className="row justify-content-center px-3 pt-5">
      <div className="col-md-6 col-lg-4">
        <Confetti
          width={confettiConfig.width}
          height={confettiConfig.height}
          numberOfPieces={800}
          gravity={confettiConfig.gravity}
          recycle={false}
          run={confettiConfig.run}
          tweenDuration={30000}
        />
        <div className="d-flex justify-content-center gap-2 mb-5">
          <FontAwesomeIcon
            className="color-teal-dark"
            icon={faRocket}
            size="3x"
          />
          <FontAwesomeIcon
            className="color-teal-dark"
            icon={faRocket}
            size="3x"
          />
          <FontAwesomeIcon
            className="color-teal-dark"
            icon={faRocket}
            size="3x"
          />
        </div>
        <div className="text-center mb-5">
          <div className="h3 text-primary-custom lh-2 fw-bolder">
            Published
            <br /> Your page is online, share it
            <br /> to let the world knows
          </div>
        </div>
        <label className="font-18 fw-bolder text-primary-custom lh-2">
          Share your page
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-highlight-custom text-white fs-5"
            value={domainName}
            readOnly
          />
          <button
            className="btn btn-highlight"
            type="button"
            id="button-addon2"
            onClick={() => {
              navigator.clipboard.writeText(domainName);
              Toast.fire({
                icon: "success",
                title: "Link copied to your clipboard",
              });
            }}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faFacebook}
              size="2x"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faWhatsapp}
              size="2x"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faTwitter}
              size="2x"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faLine}
              size="2x"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faInstagram}
              size="2x"
            />
          </button>
          <button className="btn">
            <FontAwesomeIcon
              className="text-secondary"
              icon={faTiktok}
              size="2x"
            />
          </button>
        </div>
        <button className="btn btn-primary btn-full w-100 mb-3">
          Go to Dashboard
        </button>
        <button className="btn btn-secondary btn-full w-100">
          Back to Home
        </button>
      </div>
    </div>
  );
}
