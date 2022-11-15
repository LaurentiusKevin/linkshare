import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreatePage from "../../Components/LinkPages/CreatePage";

const formSchema = yup
  .object({
    email: yup.string().email().required("Email wajib diisi!"),
    password: yup
      .string()
      .length(6, "Minimal 6 karakter!")
      .required("Password wajib diisi!"),
  })
  .required();

const addLinkFormSchema = yup.object({
  linkLabel: yup.string().required("Link Label wajib diisi"),
  linkUrl: yup.string().required("Link URL wajib diisi"),
});

export default function EditPages() {
  const [activePage, setActivePage] = useState("step-1");
  const [linkPage, setLinkPage] = useState([]);
  const [pageData, setPageData] = useState({
    url: "",
    name: "",
    description: "",
    link: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const createPageSubmit = (data) => {
    setPageData({
      ...pageData,
      url: data.url,
      name: data.name,
      description: data.description,
    });
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
          <>
            <div className="h6 fw-bolder text-primary-custom">
              Start adding your link
            </div>
            <div className="text-primary-custom">
              Add link to your page easily.
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActivePage("step-2-add")}
            >
              <FontAwesomeIcon icon={faPlus} /> Add link
            </button>

            <div className="my-5 d-flex justify-content-center">
              {linkPage.length === 0 && <div>No Link Preview</div>}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <button className="btn w-100 btn-primary">Next</button>
            </form>
          </>
        )}

        {activePage === "step-2-add" && (
          <>
            <div className="h6 fw-bolder text-primary-custom">
              Add your link detail
            </div>
            <span className="text-primary-custom">
              Add link to your pages easily
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Link Label <span className="text-danger">*</span>
                </label>
                <input
                  {...register("linkLabel")}
                  type="text"
                  className="form-control"
                />
                {errors.linkLabel && (
                  <div className="text-danger">{errors.linkLabel.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Link URL <span className="text-danger">*</span>
                </label>
                <input
                  {...register("linkURL")}
                  type="text"
                  className="form-control"
                />
                {errors.linkURL && (
                  <div className="text-danger">{errors.linkURL.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Link Icon <span className="text-danger">*</span>
                </label>
              </div>
              <button className="btn w-100 btn-primary">Next</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
