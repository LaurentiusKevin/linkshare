import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faRobot } from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "./LinkCard";
import { useState } from "react";
import Image from "next/image";

export default function PublishPageComponent(props) {
  const { pageData, setActivePage, onSubmitPage } = props;
  const [backgroundImage, setBackgroundImage] = useState({
    background: `url(${pageData.backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  });

  return (
    <>
      <button
        className="btn text-primary-custom fw-bold"
        onClick={() => setActivePage("step-2-list")}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> back
      </button>
      <div className="row justify-content-center my-3">
        <div className="col-10">
          <div className="card card-style" style={backgroundImage}>
            <div className="content">
              <div className="d-flex justify-content-center">
                <Image
                  src={pageData.logoImage}
                  alt="Logo Image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="mt-3 mb-3 fw-bolder text-primary-custom h1 text-center">
                {pageData.name}
              </div>
              <div className="mb-3 fw-bold text-primary-custom h6 text-center">
                {pageData.description}
              </div>
              {pageData.link.map((item, key) => (
                <LinkCardComponent
                  key={key}
                  keyData={key}
                  label={item.linkLabel}
                  icon={faRobot}
                  linkIcon={item.linkIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-100" onClick={onSubmitPage}>
        Publish
      </button>
    </>
  );
}
