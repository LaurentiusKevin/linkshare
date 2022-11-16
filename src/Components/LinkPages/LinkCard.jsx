import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export default function LinkCardComponent(props) {
  const { label, keyData, editLink } = props;

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
          <FontAwesomeIcon icon={faRobot} size="2x" className="text-white" />
          <div className="text-white fw-bolder">{label}</div>
        </div>
      </div>
    </div>
  );
}
