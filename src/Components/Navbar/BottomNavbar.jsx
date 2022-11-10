import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BottomNavbar({
  href,
  title,
  icon,
  urlPath,
  className = "",
  iconColor,
  circleNav,
}) {
  return (
    <Link href={href} shallow={true} className={(urlPath === href ? `active-nav` : "") + className}>
      <FontAwesomeIcon color={iconColor} icon={icon} />
      <span>{title}</span>
      {urlPath === href && <em></em>}
      {circleNav === true && (
        <strong>
          <u></u>
        </strong>
      )}
    </Link>
  );
}
