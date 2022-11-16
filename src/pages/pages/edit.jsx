import { useState } from "react";
import CreatePage from "../../Components/LinkPages/CreatePage";
import AddLinkComponents from "../../Components/LinkPages/AddLink";
import ListLinkComponent from "../../Components/LinkPages/ListLink";
import PublishPageComponent from "../../Components/LinkPages/PublishPage";

export default function EditPages() {
  const [activePage, setActivePage] = useState("step-1");
  const [editedLinkKey, setEditedLinkKey] = useState(null);
  const [pageData, setPageData] = useState({
    url: "",
    name: "",
    description: "",
    link: [],
  });

  const createPageSubmit = (data) => {
    setPageData({
      ...pageData,
      url: data.url,
      name: data.name,
      description: data.description,
    });
    setActivePage("step-2-list");
  };

  const createLinkSubmit = (data) => {
    let newData;
    if (editedLinkKey !== null) {
      newData = pageData.link;
      newData[editedLinkKey] = data;
    } else {
      newData = [...pageData.link, data];
    }

    setPageData({
      ...pageData,
      link: newData,
    });
    setEditedLinkKey(null);
    setActivePage("step-2-list");
  };

  const editLink = (key) => {
    setEditedLinkKey(key);
    setActivePage("step-2-add");
  };

  const deleteLink = () => {
    let newData;
    if (editedLinkKey !== null) {
      newData = pageData.link;
      newData.splice(editedLinkKey, 1);
      setPageData({
        ...pageData,
        link: newData,
      });
      setEditedLinkKey(null);
      setActivePage("step-2-list");
    }
  };

  const submitPage = () => {
    setActivePage("publish");
  };

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="h6 fw-bolder text-primary-custom">Sign Up</div>
        <div className="d-flex mb-4">
          <div
            className="btn-group w-100"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={
                `btn btn-primary rounded-0 ` +
                (activePage === "step-1" ? "btn-secondary" : "")
              }
              onClick={() => setActivePage("step-1")}
            >
              <span className="fw-bolder">Step 1</span>
            </button>
            <button
              type="button"
              className={
                `btn btn-primary rounded-0 ` +
                (["step-2-list", "step-2-add"].includes(activePage)
                  ? "btn-secondary"
                  : "")
              }
              onClick={() => setActivePage("step-2-list")}
            >
              <span className="fw-bolder">Step 2</span>
            </button>
          </div>
        </div>

        {activePage === "step-1" && <CreatePage onSubmit={createPageSubmit} />}

        {activePage === "step-2-list" && (
          <ListLinkComponent
            setActivePage={setActivePage}
            links={pageData.link}
            editLink={editLink}
            submitPage={submitPage}
          />
        )}

        {activePage === "step-2-add" && (
          <AddLinkComponents
            onSubmit={createLinkSubmit}
            editedLinkKey={editedLinkKey}
            links={pageData.link}
            deleteLink={deleteLink}
          />
        )}

        {activePage === "publish" && (
          <PublishPageComponent
            pageData={pageData}
            setActivePage={setActivePage}
          />
        )}
      </div>
    </div>
  );
}
