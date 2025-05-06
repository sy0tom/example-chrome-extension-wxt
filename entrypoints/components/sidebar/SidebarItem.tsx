import { tv } from "tailwind-variants";
import Icon, { IconType } from "../icon/Icon";

const style = tv({
  base: "flex items-center hover:bg-primary-light px-4 py-4",
  variants: {
    selected: {
      true: "bg-primary-dark",
      false: "",
    },
  },
});

interface Props {
  item: { title: string; link: string; iconType: IconType };
  selected: boolean;
}

function SidebarItem({ item, selected }: Props) {
  return (
    <>
      <div className={style({ selected: selected })}>
        <Icon iconType={item.iconType} fontSize="large" />
        <div className="text-white font-sans text-2xl px-2">{item.title}</div>
      </div>
    </>
  );
}

export default SidebarItem;
