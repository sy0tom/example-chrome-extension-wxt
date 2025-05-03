import FeedbackIcon from "@mui/icons-material/Feedback";
import PersonIcon from "@mui/icons-material/Person";

const IconMap = {
  feedback: FeedbackIcon,
  user: PersonIcon,
} as const;

export type IconType = keyof typeof IconMap;

interface Props {
  type: IconType;
}

function Icon({ type }: Props) {
  const IconComponent = IconMap[type];
  return <>{<IconComponent />}</>;
}

export default Icon;
