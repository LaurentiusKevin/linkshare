import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function AddLinkComponents(props) {
  const { onSubmit, editedLinkKey, links, deleteLink } = props;
  const MySwal = withReactContent(Swal);
  const [deleteModal, setDeleteModal] = useState(false);

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

      {/*<Modal isOpen={deleteModal} toggle={deleteModalToggle} animation={false}>*/}
      {/*  <ModalHeader toggle={deleteModalToggle}>Modal title</ModalHeader>*/}
      {/*  <ModalBody>Are you sure to delete this link?</ModalBody>*/}
      {/*  <ModalFooter>*/}
      {/*    <Button color="danger" onClick={deleteLink}>*/}
      {/*      Delete*/}
      {/*    </Button>{" "}*/}
      {/*    <Button color="secondary" onClick={deleteModalToggle}>*/}
      {/*      Cancel*/}
      {/*    </Button>*/}
      {/*  </ModalFooter>*/}
      {/*</Modal>*/}
    </>
  );
}
