import {getCurrentUser} from "../../Config/FirebaseAuthentication";
import {getPagesByUid} from "../../Config/FirebaseFirestore";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faRobot} from "@fortawesome/free-solid-svg-icons";
import LinkCardComponent from "../../Components/LinkPages/LinkCard";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage(props) {
  const {MySwal, Toast, user} = props;
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
            <FontAwesomeIcon icon={faPlus} className="mr-1"/><span className="h6 text-light"> New page</span>
          </Link>
        </div>
        <div className="row">
          {pagesData.map((item, key) => (
            <div key={`list-page-${key}`} className="col-lg-6">
              <Link href={`/pages/edit/${item.url}`}>
                <div
                  className="mb-4 card card-style"
                  style={{minHeight: '60vh'}}>
                  <Image
                    src={item.backgroundImage}
                    alt={item.name}
                    fill
                    style={{objectFit: "cover"}}
                  />
                  <div className="p-4" style={style.overlay}>
                    <div className="content">
                      <div className="d-flex justify-content-center">
                        <Image
                          src={item.logoImage}
                          alt="Logo Image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="mt-3 mb-3 fw-bolder text-dark h5 text-center">
                        {item.name}
                      </div>
                      <div className="mb-3 fw-bold text-dark h6 text-center">
                        {item.description}
                      </div>
                      {item.link.map((item, key) => (
                        <LinkCardComponent
                          key={key}
                          keyData={key}
                          label={item.linkLabel}
                          icon={faRobot}
                          linkIcon={item.linkIcon}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const style = {
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(123,176,185,0.6)'
  },
  bgTransparent: {
    backgroundColor: 'transparent'
  }
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
