import { getCurrentUser } from "../../Config/FirebaseAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getProfile, storeProfile } from "../../Config/FirebaseFirestore";

const formSchema = yup.object({
  uid: yup.string().required("UID is Required"),
  email: yup.string().email().required("Email is Required"),
  username: yup.string().required("Username is Required"),
  link: yup.string().required("Link is Required"),
});

const defaultProfile = {
  uid: "",
  email: "",
  username: "",
  link: "",
};

export default function UserProfilePage(props) {
  const [profile, setProfile] = useState(defaultProfile);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    storeProfile(data)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("store profile failed: ", e);
      });
  };

  useEffect(() => {
    setProfile({
      ...profile,
      uid: props.user.uid,
      email: props.user.email,
    });
    setValue("uid", props.user.uid);
    setValue("email", props.user.email);

    getProfile(props.user.uid).then((data) => {
      if (data !== undefined) {
        setValue("username", data.username);
        setValue("link", data.link);
      }
    });
  }, []);

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <Link href="/settings" className="h6 fw-bolder text-primary-custom">
          <FontAwesomeIcon icon={faCaretLeft} /> Back
        </Link>
        <div className="h4 fw-bolder text-primary-custom my-4">
          Edit Profile
        </div>
        <div className="card card-style">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Email
                </label>
                <div>{getValues("email")}</div>
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  {...register("username")}
                  type="text"
                  className="form-control"
                />
                {errors.username && (
                  <div className="text-danger">{errors.username.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Link <span className="text-danger">*</span>
                </label>
                <input
                  {...register("link")}
                  type="text"
                  className="form-control"
                />
                {errors.link && (
                  <div className="text-danger">{errors.link.message}</div>
                )}
              </div>
              <button type="submit" className="btn w-100 btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
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
