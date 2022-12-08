import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePage from "../../Components/LinkPages/CreatePage";
import { useState } from "react";
import { faBackspace, faBackward, faBackwardStep, faCaretLeft, faHandBackFist, faPlus, faRobot, faRotateBack, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "./LinkCard";
// import useState from "../../pages/add";

export default function ListLinkComponent(props) {
  const { setActivePage, links, editLink, submitPage } = props;

  return (
    <>
    <a
        type="button"
        className="h4 fw-bolder text-primary-custom"
        onClick={() => setActivePage("step-1")}
      ><FontAwesomeIcon icon={faCaretLeft} /> back
      </a>
      <div className="h6 fw-bolder text-primary-custom">
        Start adding your link
      </div>
      <div className="text-primary-custom">Add link to your page easily.</div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setActivePage("step-2-add")}
      >
        <FontAwesomeIcon icon={faPlus} /> Add link
      </button>
      <div className="my-5 d-flex flex-column justify-content-center">
        {links.length === 0 ? (
          <div>No Link Preview</div>
        ) : (
          <>
            <div className="text-center mb-2">
              <div className="text-primary-custom h5 fw-bold">Link Preview</div>
              <div className="text-primary-custom h6">Tap to edit</div>
            </div>
            {links.map((item, key) => (
              <LinkCardComponent
                key={key}
                keyData={key}
                label={item.linkLabel}
                icon={faRobot}
                editLink={editLink}
                linkIcon={item.linkIcon}
                linkUrl={item.linkUrl}
              />
            ))}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={submitPage}
        className="btn w-100 btn-primary"
      >
        Next
      </button>
    </>
  );
}
