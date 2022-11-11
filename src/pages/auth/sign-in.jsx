import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="text-center">
          <h1>Login to your account</h1>
          <div className="d-flex justify-content-center">
            <p className="w-50">Link Share is here to help you grow your business</p>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="email" className="form-control" placeholder="name@example.com"/>
        </div>
        <div className="d-flex justify-content-end">
          <Link href="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>
        <button className="btn w-100 btn-info mt-2">Sign In</button>
        <div className="text-center mt-2">
          Don&apos;t have account? <Link href="/auth/sign-up" className="fw-bold text-info">Sign up or create page here</Link>
        </div>
      </div>
    </div>
  )
}
