import {
  changePassword,
  getCurrentUser,
} from "../../Config/FirebaseAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FirebaseResponseCode } from "../../Config/FirebaseAuthConstants";
import { useRouter } from "next/router";

const formSchema = yup.object({
  email: yup.string().email().required("Email is Required"),
  oldPassword: yup.string().required("Old Password is Required"),
  newPassword: yup
    .string()
    .required("New Password is Required")
    .min(6, "Minimum Password is 6 Characters"),
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is Required")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Please enter the same value again."
    ),
});

export default function ChangePasswordPage(props) {
  const { MySwal } = props;
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    changePassword({
      email: props.user.email,
      ...data,
    })
      .then((response) => {
        MySwal.fire({
          title: "Password change",
          icon: "success",
        }).then(async () => {
          await router.push("/settings");
        });
      })
      .catch((e) => {
        MySwal.fire({
          title: FirebaseResponseCode[e.code],
          icon: "warning",
        });
      });
  };

  useEffect(() => {
    setValue("email", props.user.email);
  }, []);

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <Link href="/settings" className="h7 fw-bolder text-primary-custom">
          <FontAwesomeIcon icon={faCaretLeft} /> back
        </Link>
        <div className="h6 fw-bolder text-primary-custom my-4">
          Change Password
        </div>
        <div className="card card-style">
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Old Password <span className="text-danger">*</span>
                </label>
                <input
                  {...register("oldPassword")}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                />
                {errors.oldPassword && (
                  <div className="text-danger">
                    {errors.oldPassword.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  New Password <span className="text-danger">*</span>
                </label>
                <input
                  {...register("newPassword")}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                />
                {errors.newPassword && (
                  <div className="text-danger">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0 text-primary-custom fw-bold">
                  Confirm New Password <span className="text-danger">*</span>
                </label>
                <input
                  {...register("confirmNewPassword")}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                />
                {errors.confirmNewPassword && (
                  <div className="text-danger">
                    {errors.confirmNewPassword.message}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="text-primary-custom mb-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide password" : "Show password"}
                </button>
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
