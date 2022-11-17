import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup
  .object({
    url: yup.string().required("URL wajib diisi!"),
    name: yup.string().required("Nama Halaman wajib diisi!"),
    description: yup.string().required("Deskripsi wajib diisi!"),
  })
  .required();

export default function CreatePage(props) {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <div className="h6 fw-bolder text-primary-custom">
        Input your page URL
      </div>
      <span className="text-primary-custom">
        Your page will be online with chosen username after proceeding. You can
        modify it later on &quot;Page Settings&quot;.
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            {...register("url")}
            type="text"
            className="form-control"
            onKeyUp={(e) => {
              if (e.target.value.includes(" ")) {
                e.target.value = e.target.value.replaceAll(" ", "_");
              }
              if (e.target.value.includes("/")) {
                e.target.value = e.target.value.replaceAll("/", "");
              }
            }}
          />
          {errors.url && (
            <div className="text-danger">{errors.url.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label mb-0 text-primary-custom fw-bold">
            Pages Name <span className="text-danger">*</span>
          </label>
          <input {...register("name")} type="text" className="form-control" />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label mb-0 text-primary-custom fw-bold">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            {...register("description")}
            className="form-control"
          ></textarea>
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <button type="submit" className="btn w-100 btn-primary">
          Next
        </button>
      </form>
    </>
  );
}
