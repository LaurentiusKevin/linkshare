import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRobot } from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "./LinkCard";

export default function ListLinkComponent(props) {
  const { setActivePage, links, editLink, submitPage } = props;

  return (
    <>
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
