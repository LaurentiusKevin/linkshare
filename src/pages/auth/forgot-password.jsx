import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  authSignIn,
  getCurrentUser,
} from "../../Config/FirebaseAuthentication";
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
});

export default function LoginPage(props) {
  const router = useRouter();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    setLoginErrorMessage("");
    authSignIn(data)
      .then(async (r) => {
        setCookie(null, "user", JSON.stringify(r.user), { path: "/" });
        await router.push("/dashboard");
      })
      .catch((e) => {
        let title;
        switch (e.code) {
          case "auth/wrong-password":
            title = (
              <div className="h4">
                Email or Password incorrect. <br /> Please try again later.
              </div>
            );
            break;

          default:
            title = (
              <div className="h4">
                There is something wrong with the server, or the error code is
                not mapped yet!
              </div>
            );
            break;
        }
        props.MySwal.fire({
          title: "Something wrong",
          text: e.code,
        }).then((r) => {
          console.log("Sign In warning", e.code);
        });
      });
  };

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-7 col-lg-4">
        <div className="text-left">
          <div className="h3 fw-bolder text-primary-custom">
            Forgot Password
          </div>
        </div>
        {loginErrorMessage !== "" && (
          <div className="alert alert-danger">{loginErrorMessage}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="form-label mb-0 text-primary-custom fw-bold">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="form-control"
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          {/* <div className="mb-2">
            <p className="text-danger">Please enter a valid email address (ex:johndoe@domain.com).</p>
          </div> */}
          
          <button className="btn w-100 btn-primary mt-2">Confirm</button>
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
        destination: "/auth/confirm-password",
      },
    };
  }

  return {
    props: {},
  };
}
