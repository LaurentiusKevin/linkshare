import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { getImage, uploadImage } from "../../Config/FirebaseStorage";

const formSchema = yup.object({
  url: yup.string().required("Link URL is Required"),
  name: yup.string().required("Pages name is required"),
  description: yup.string().required("Description is Required"),
});

export default function CreatePage(props) {
  const { onSubmit } = props;
  const [imageFile, setImageFile] = useState({
    logoImage: undefined,
    backgroundImage: undefined,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onFileChange = (input, fileType) => {
    let filename = `page-image/${self.crypto.randomUUID()}.jpg`;
    uploadImage(filename, input.target.files[0]).then((e) => {
      getImage(filename).then((url) => {
        if (fileType === "logoImage") {
          setValue("logoImage", url);
          setImageFile({
            ...imageFile,
            logoImage: url,
          });
        }
        if (fileType === "backgroundImage") {
          setValue("backgroundImage", url);
          setImageFile({
            ...imageFile,
            backgroundImage: url,
          });
        }
      });
    });
  };

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
        <div className="mb-3">
          <label className="form-label mb-0 text-primary-custom fw-bold">
            Logo Image <span className="text-danger">*</span>
          </label>
          <div className="d-flex flex-column gap-2 align-items-center">
            <Image
              src={imageFile.logoImage ?? "/images/pictures/3s.jpg"}
              width={100}
              height={100}
              className="border border-aqua-dark "
              alt="logo-image"
            />
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                onFileChange(e, "logoImage");
              }}
            />
          </div>
          {errors.logoImage && (
            <div className="text-danger">{errors.logoImage.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label mb-0 text-primary-custom fw-bold">
            Background Image <span className="text-danger">*</span>
          </label>
          <div className="d-flex flex-column gap-2 align-items-center">
            <Image
              src={imageFile.backgroundImage ?? "/images/pictures/8l.jpg"}
              width={300}
              height={466}
              className="border border-aqua-dark "
              alt="background-image"
            />
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                onFileChange(e, "backgroundImage");
              }}
            />
          </div>
          {errors.logoImage && (
            <div className="text-danger">{errors.logoImage.message}</div>
          )}
        </div>
        <button type="submit" className="btn w-100 btn-primary">
          Next
        </button>
      </form>
    </>
  );
}
