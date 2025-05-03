import FeedbackIcon from "@mui/icons-material/Feedback";
import PersonIcon from "@mui/icons-material/Person";

const IconMap = {
  feedback: FeedbackIcon,
  user: PersonIcon,
} as const;

export type IconType = keyof typeof IconMap;

interface Props {
  iconType: IconType;
  fontSize: "inherit" | "small" | "medium" | "large";
}

function Icon({ iconType, fontSize }: Props) {
  const IconComponent = IconMap[iconType];
  return <>{<IconComponent className="text-white" fontSize={fontSize} />}</>;
}

export default Icon;
