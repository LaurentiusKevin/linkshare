import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LinkCardComponent(props) {
  const { asLink, label, keyData, editLink, linkIcon, linkUrl } = props;

  const LinkDetail = () => {
    return (
      <div
        key={keyData}
        className="card card-style"
        style={{ backgroundColor: "#0b434c" }}
        onClick={() => {
          if (editLink instanceof Function) {
            editLink(keyData);
          }
        }}
      >
        <div className="content">
          <div className="d-flex gap-3">
            <FontAwesomeIcon icon={linkIcon} size="2x" className="text-white" />
            <div className="text-white fw-bolder">{label}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {asLink === true ? (
        <Link href={linkUrl} target="_blank">
          <LinkDetail />
        </Link>
      ) : (
        <LinkDetail />
      )}
    </>
  );
}
