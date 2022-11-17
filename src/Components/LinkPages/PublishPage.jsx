import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faJetFighterUp,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "./LinkCard";

export default function PublishPageComponent(props) {
  const { pageData, setActivePage, onSubmitPage } = props;

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
          <div
            className="card card-style"
            style={{
              background:
                "linear-gradient(155deg, rgba(248,246,247,1) 0%, rgba(211,210,208,1) 100%)",
            }}
          >
            <div className="content">
              <div className="d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faJetFighterUp}
                  size="5x"
                  className="my-5"
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
