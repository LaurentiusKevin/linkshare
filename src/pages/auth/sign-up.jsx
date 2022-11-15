import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const formSchema = yup
  .object({
    email: yup.string().email().required("Email wajib diisi!"),
    password: yup
      .string()
      .length(6, "Minimal 6 karakter!")
      .required("Password wajib diisi!"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password harus sama"),
  })
  .required();

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="text-center mb-5">
          <div className="h4 fw-bolder text-primary-custom">
            Sign up your account
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label mb-0 text-primary-custom fw-bold">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label mb-0 text-primary-custom fw-bold">
              Password <span className="text-danger">*</span>
            </label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="name@example.com"
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
              placeholder="name@example.com"
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
            Sign In
          </button>
        </form>
        <div className="text-center mt-2 fw-bold">
          Already have account?{" "}
          <Link href="/auth/sign-up" className="text-primary-custom">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
