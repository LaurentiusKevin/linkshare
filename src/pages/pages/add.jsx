import { useState } from "react";
import CreatePage from "../../Components/LinkPages/CreatePage";
import AddLinkComponents from "../../Components/LinkPages/AddLink";
import ListLinkComponent from "../../Components/LinkPages/ListLink";
import PublishPageComponent from "../../Components/LinkPages/PublishPage";
import { storePage } from "../../Config/FirebaseFirestore";
import { getCurrentUser } from "../../Config/FirebaseAuthentication";
import { useRouter } from "next/router";

export default function AddPage(props) {
  const { MySwal } = props;
  const router = useRouter();
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
      logoImage: data.logoImage,
      backgroundImage: data.backgroundImage,
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

  const onSubmitPage = async () => {
    await storePage(props.user.uid, pageData);

    await router.push(`/publish?page=${pageData.url}`);
  };

  props = {
    ...props,
    pageData,
    createPageSubmit,
  };

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="h6 fw-bolder text-primary-custom">Add Page</div>
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
              <div className="fw-bolder">Step 1</div>
              <div>Page Info</div>
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
              <div className="fw-bolder">Step 2</div>
              <div>Add Link</div>
            </button>
          </div>
        </div>

        {activePage === "step-1" && <CreatePage {...props} />}

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
            {...props}
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
            onSubmitPage={onSubmitPage}
          />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let user = getCurrentUser(context);

  if (user === null) {
    return {
      redirect: {
        destination: "/auth/sign-in",
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
