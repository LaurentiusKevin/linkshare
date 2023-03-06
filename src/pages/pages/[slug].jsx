import Image from "next/image";
import LinkCardComponent from "../../Components/LinkPages/LinkCard";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import {getPage} from "../../Config/FirebaseFirestore";
import {useEffect, useState} from "react";
import {Card, Col} from "reactstrap";

export default function PagesDetail(props) {
  const {
    pageData,
  } = props
  const [pageLink, setPageLink] = useState([]);
  // const [backgroundImage, setBackgroundImage] = useState({});

  useEffect(() => {
    setPageLink(pageData.link);
  }, [pageData.link]);

  return (<>
      <div className="row justify-content-center">
        <Col
          sm={12} md={6} lg={4} className="p-5 h-100 background-size-custom card card-style"
          style={{minHeight: '100vh'}}>
          <Image
            src={pageData?.backgroundImage}
            alt={pageData?.name}
            fill
            style={{objectFit: "cover"}}
          />
          <div className="p-4" style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(123,176,185,0.6)'
          }}>
            <div className="content">
              <Card style={{backgroundColor: "transparent"}}>
                <div className="d-flex justify-content-center">
                  {pageData?.logoImage && (<Image
                      src={pageData?.logoImage}
                      alt="Logo Image"
                      width={100}
                      height={100}
                    />)}
                </div>
                <div className="mt-3 mb-3 fw-bolder text-primary-custom h1 text-center">
                  {pageData?.name}
                </div>
                <div className="mb-3 fw-bold text-primary-custom h5 text-center">
                  {pageData?.description}
                </div>
              </Card>
              {pageLink?.map((item, key) => (<LinkCardComponent
                  key={key}
                  keyData={key}
                  label={item.linkLabel}
                  icon={faRobot}
                  linkIcon={item.linkIcon}
                  linkUrl={item.linkUrl}
                  asLink={true}
                />))}
            </div>
          </div>
        </Col>
      </div>
    </>);
}

export const getServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const pageData = await getPage(slug);

  if (!pageData || pageData.status !== "active") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageData,
    },
  };
};
