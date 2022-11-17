import nookies from "nookies";
import { authSignOut } from "../../Config/FirebaseAuthentication";

export default function AuthLogout() {
  return <></>;
}

export async function getServerSideProps(context) {
  nookies.destroy(context, "user", {
    path: "/",
  });

  await authSignOut();

  return {
    redirect: {
      destination: "/",
    },
  };
}
