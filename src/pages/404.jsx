import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4 text-center">
        <div className="h1 text-primary-custom fw-bolder my-3">
          OOPS !!!
        </div>
        <Image src="/icon/404.png" alt="404 icon" width={400} height={200} className="mt-3" />
        <div className="h5 fw-bold" style={{color: "#14A2BA"}}>
          The page you requested could not be found.
        </div>

        <Link href="/auth/sign-up">
          <button type="button" className="btn px-5 btn-primary fw-bold mt-2">
            Create your Free pages now
          </button>
        </Link>
      </div>
    </div>
  );
}
