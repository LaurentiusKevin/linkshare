import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faRobot } from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "./LinkCard";
import { useState } from "react";
import Image from "next/image";
import {Col} from "reactstrap";

export default function PublishPageComponent(props) {
  const { pageData, setActivePage, onSubmitPage } = props;
  const [backgroundImage, setBackgroundImage] = useState({
    background: `url(${pageData.backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  return (
    <>
      <button
        className="mb-2 h7 fw-bolder text-primary-custom"
        onClick={() => setActivePage("step-2-list")}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> back
      </button>
      <div className="row justify-content-center my-3">
        <Col
          sm={12} md={10} lg={10} className="p-5 h-100 background-size-custom card card-style"
          style={{minHeight: '60vh'}}>
          <Image
            src={pageData?.backgroundImage}
            alt={pageData?.name}
            fill
            style={{objectFit: "cover"}}
          />
          <div className="p-4" style={style.overlay}>
            <div className="content">
              <div className="d-flex justify-content-center">
                <Image
                  src={pageData.logoImage}
                  alt="Logo Image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="mt-3 mb-3 fw-bolder text-dark h1 text-center">
                {pageData.name}
              </div>
              <div className="mb-3 fw-bold text-dark h6 text-center">
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
        </Col>
      </div>
      <button className="btn btn-primary w-100" onClick={onSubmitPage}>
        Publish
      </button>
    </>
  );
}

const style = {
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(123,176,185,0.6)'
  },
  bgTransparent: {
    backgroundColor: 'transparent'
  }
}
