import { useRouter } from "next/router";
import Image from "next/image";
import LinkCardComponent from "../../Components/LinkPages/LinkCard";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { getPage, storePage } from "../../Config/FirebaseFirestore";
import { useEffect, useState } from "react";

export default function PagesDetail(props) {
  const router = useRouter();
  const [pageInfo, setPageInfo] = useState({});
  const [backgroundImage, setBackgroundImage] = useState({});

  useEffect(() => {
    if (router.isReady) {
      getPage(router.query.slug).then((pageData) => {
        console.log(pageData, router.query.slug);
        setPageInfo(pageData);
        setBackgroundImage({
          background: `url(${pageData?.backgroundImage})`,
          minHeight: "100vh",
          backgroundSize: "cover",
        });
        storePage(pageData.uid, pageData).then((pageResponse) => {
          console.log("view added");
        });
      });
    }
  }, [router.isReady]);

  return (
    <div className="row justify-content-center">
      <div
        className="col-md-6 col-lg-4 p-5 h-100 background-size-custom card card-style"
        style={backgroundImage}
      >
        <div className="content">
          <div className="d-flex justify-content-center">
            <Image
              src={pageInfo?.logoImage}
              alt="Logo Image"
              width={100}
              height={100}
            />
          </div>
          <div className="mt-3 mb-3 fw-bolder text-primary-custom h1 text-center">
            {pageInfo?.name}
          </div>
          <div className="mb-3 fw-bold text-primary-custom h6 text-center">
            {pageInfo?.description}
          </div>
          {pageInfo?.link?.map((item, key) => (
            <LinkCardComponent
              key={key}
              keyData={key}
              label={item.linkLabel}
              icon={faRobot}
              linkIcon={item.linkIcon}
              linkUrl={item.linkUrl}
              asLink={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
