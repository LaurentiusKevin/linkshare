import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function AddLinkComponents(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { onSubmit, editedLinkKey, links, deleteLink } = props;
  const MySwal = withReactContent(Swal);

  const formSchema = yup.object({
    linkLabel: yup.string().required("Link Label wajib diisi"),
    linkUrl: yup
      .string()
      .url(`Gunakan format URL (contoh: ${window.location.href})`)
      .required("Link URL wajib diisi"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const deleteModalToggle = () => {
    MySwal.fire({
      title: <p>Are you sure to delete this link?</p>,
      showConfirmButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#cf6059",
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "#14a2ba",
    }).then((e) => {
      if (e.isConfirmed === true) {
        deleteLink();
      }
    });
  };

  useEffect(() => {
    if (editedLinkKey !== null) {
      reset(links[editedLinkKey]);
    }
  }, []);

  return (
    <>
      <div className="h6 fw-bolder text-primary-custom">
        Add your link detail
      </div>
      <span className="text-primary-custom">Add link to your pages easily</span>
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
            {...register("linkUrl")}
            type="text"
            className="form-control"
          />
          {errors.linkUrl && (
            <div className="text-danger">{errors.linkUrl.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label mb-0 text-primary-custom fw-bold">
            Link Icon <span className="text-danger">*</span>
          </label>
          <div className="d-flex gap-4 px-3 align-middle">
            <FontAwesomeIcon icon="fab fa-facebook" size="3x" />
            <button type="button" className="btn bg-gray-dark" onClick={toggle}>
              Choose
            </button>
          </div>
        </div>
        {editedLinkKey !== null ? (
          <div className="d-flex gap-3">
            <button type="submit" className="btn w-100 btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn w-100 btn-danger"
              onClick={deleteModalToggle}
            >
              Delete
            </button>
          </div>
        ) : (
          <button type="submit" className="btn w-100 btn-primary">
            Next
          </button>
        )}
      </form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Select Icon</ModalHeader>
        <ModalBody>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            {props.iconList.map((item, key) => (
              <button
                key={`icon-list-${key}`}
                type="button"
                className="btn btn-primary"
              >
                <FontAwesomeIcon key={key} icon={item} size="3x" />
              </button>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
