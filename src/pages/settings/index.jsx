import { getCurrentUser } from "../../Config/FirebaseAuthentication";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faLock,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SettingsPage(props) {
  const { pageInfo } = props;

  const router = useRouter();

  return (
    <div className="row justify-content-center px-3">
      <div className="col-md-6 col-lg-4">
        <div className="h6 fw-bolder text-primary-custom mb-4">Settings</div>
        <div className="card card-style">
          <div className="content">
            <div className="d-flex align-items-end text-center" style={{ minHeight: "30vh" }}>
              <div>
              <img 
              src="https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png" 
              alt="" 
              className="img-preview img-fluid mb-2 col-sm-5" 
              />
                <div className="mt-3 mb-3 fw-bolder text-primary-custom h6 text-center">{props.user.email}</div>
                {/* <div className="h6 fw-bold text-center">{pageInfo.domain}/</div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 d-flex flex-column gap-3">
          <Link href="/settings/user-profile">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="card card-style gradient-highlight p-3 my-0 ms-0">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                    className="text-white"
                  />
                </div>
                <div className="h7 fw-bold text-dark align-self-center">
                  User Profile
                </div>
              </div>
              <FontAwesomeIcon className="mt-3" icon={faCaretRight} size="2x" />
            </div>
          </Link>
          <Link href="/settings/change-password">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="card card-style gradient-grass p-3 my-0 ms-0">
                  <FontAwesomeIcon
                    icon={faLock}
                    size="2x"
                    className="text-white"
                  />
                </div>
                <div className="h7 fw-bold text-dark align-self-center">
                  Change Password
                </div>
              </div>
              <FontAwesomeIcon className="mt-3" icon={faCaretRight} size="2x" />
            </div>
          </Link>
          <Link href="/auth/sign-out">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="card card-style gradient-highlight p-3 my-0 ms-0">
                  <FontAwesomeIcon
                    icon={faSignOut}
                    size="2x"
                    className="text-white"
                  />
                </div>
                <div className="h7 fw-bold text-dark align-self-center">
                  Log out
                </div>
              </div>
              <FontAwesomeIcon className="mt-3" icon={faCaretRight} size="2x" />
            </div>
          </Link>
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
      isLoggedIn : user !== null
    },
  };
}
