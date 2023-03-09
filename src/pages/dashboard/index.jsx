import { getCurrentUser } from "../../Config/FirebaseAuthentication";
import { getPagesByUid } from "../../Config/FirebaseFirestore";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "../../Components/LinkPages/LinkCard";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage(props) {
  const { MySwal, Toast, user } = props;
  const [pagesData, setPagesData] = useState([]);

  const getPage = () => {
    getPagesByUid(user.uid).then((items) => {
      let listPage = [];
      items.forEach((item) => {
        listPage.push(item.data());
      });
      setPagesData(listPage);
    });
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <div className="row justify-content-center px-1">
      <div className="col-md-6 col-lg-5">
        <div className="d-flex justify-content-between mb-4">
          <div className="h6 text-primary-custom fw-bold">Dashboard</div>
          <Link href="/pages/add" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} className="mr-1" /><span className="h6 text-light"> New page</span>
          </Link>
        </div>
        <div className="row">
          {pagesData.map((item, key) => (
            <div key={`list-page-${key}`} className="col-lg-6">
              <Link href={`/pages/edit/${item.url}`}>
                <div
                  className="mb-4 card card-style"
                  style={{
                    background: `url(${item.backgroundImage})`,
                    height: 400,
                    backgroundSize: 400,
                  }}
                >
                <div className="card-body">
                  <div className="d-flex justify-content-center mt-3">
                    <Image
                      src={item.logoImage}
                      alt="Logo Image"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="mt-2 fw-bolder text-primary-custom h6 text-center">
                    {item.name}
                  </div>
                  <div className="mb-4 fw-bold text-primary-custom text-center">
                    {item.description}
                  </div>
                  {item.link.map((item, key) => (
                    <LinkCardComponent
                      key={key}
                      keyData={key}
                      label={item.linkLabel}
                      icon={item.linkIcon}
                      linkIcon={item.linkIcon}
                      className="p-4"
                    />
                  ))}
                </div>
            </div>
              </Link>
      </div>
          ))}
    </div>
      </div >
    </div >
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
