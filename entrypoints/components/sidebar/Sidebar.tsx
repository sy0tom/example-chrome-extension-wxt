import React from "react";
import SidebarItem from "./SidebarItem";
import { IconType } from "../icon";
import { NavLink, useLocation } from "react-router";

interface Props {
  header?: React.ReactNode;
  items: { title: string; link: string; iconType: IconType }[];
}

function Sidebar({ header, items }: Props) {
  const isSelected = (link: string, index: number): boolean => {
    const location = useLocation();
    if (location.pathname === "/" && index === 0) {
      return true;
    }

    return location.pathname === link;
  };

  return (
    <>
      <div className="min-w-64 w-72 h-screen bg-primary">
        {header && header}
        {items.map((item, index) => {
          return (
            <NavLink to={item.link} key={index}>
              <SidebarItem
                item={item}
                selected={isSelected(item.link, index)}
              />
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default Sidebar;
