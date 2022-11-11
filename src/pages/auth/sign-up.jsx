import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="text-center">
          <h1>Sign up your account</h1>
          <div className="d-flex justify-content-center">
            <p className="w-50">Link Share is here to help you grow your business</p>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label mb-0">Email address</label>
          <input type="email" className="form-control" placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label className="form-label mb-0">Password</label>
          <input type="email" className="form-control" placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label className="form-label mb-0">Confirm Password</label>
          <input type="email" className="form-control" placeholder="name@example.com"/>
        </div>
        <button className="btn w-100 btn-info mt-2">Sign In</button>
        <div className="text-center mt-2">
          Already have an account ? <Link href="/auth/sign-up" className="fw-bold text-info">Sign in here</Link>
        </div>
      </div>
    </div>
  )
}
