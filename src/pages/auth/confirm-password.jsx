import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  authRegister,
  authSignIn,
  getCurrentUser,
} from "../../Config/FirebaseAuthentication";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

const formSchema = yup.object({
  email: yup
    .string()
    .required("Email is Required")
    .email("Please enter a valid email address (Ex: johndoe@domain.com)"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Minimum Password is 6 Characters"),
  passwordConfirmation: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Please enter the same value again."),
});

export default function SignUpPage(props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    authRegister(data)
      .then(async (r) => {
        authSignIn(data)
          .then(async (loginData) => {
            setCookie(null, "user", JSON.stringify(loginData.user), {
              path: "/",
            });
            await router.push("/pages/add");
          })
          .catch((loginError) => {
            props.MySwal.fire({
              title: "Something wrong",
              text: loginError.code,
            }).then((r) => {
              console.log("Sign In warning", loginError.code);
            });
          });
      })
      .catch((e) => {
        let message =
          e.code === "auth/email-already-in-use" ? "Email Exists" : e.code;
        props.MySwal.fire({
          title: "Something wrong",
          text: "Email Exists",
        }).then((r) => {
          console.log("Sign Up warning", e.code);
        });
      });
  };

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="text-left">
          <div className="h3 fw-bolder text-primary-custom">
            Forgot Password
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-3">
            <label className="form-label mb-0 text-primary-custom fw-bold">
              New Password <span className="text-danger">*</span>
            </label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="form-control"
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label mb-0 text-primary-custom fw-bold">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <input
              {...register("passwordConfirmation")}
              type={showPassword ? "text" : "password"}
              className="form-control"
            />
            {errors.passwordConfirmation && (
              <div className="text-danger">
                {errors.passwordConfirmation.message}
              </div>
            )}
          </div>
          <button
            type="button"
            className="text-primary-custom mb-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            Show password
          </button>
          <button type="submit" className="btn w-100 btn-primary mt-2">
            Confirm
          </button>
        </form>
        <div className="text-center mt-2 fw-bold">
          Already have account?{" "}
          <Link href="/auth/sign-in" className="text-primary-custom">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let user = getCurrentUser(context);

  if (user !== null) {
    return {
      redirect: {
        destination: "/pages/add",
      },
    };
  }

  return {
    props: {},
  };
}
