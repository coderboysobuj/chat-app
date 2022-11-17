import { Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { type IconType } from "react-icons";

interface ILeftbarItemProps {
  active?: boolean;
  label: string;
  icon: IconType;
}
const LeftbarItem: React.FC<ILeftbarItemProps> = ({ icon, label, active }) => {
  return (
    <IconButton
      aria-label={label}
      variant={active ? "solid" : "ghost"}
      colorScheme="blue"
      icon={<Icon as={icon} fontSize="2xl" />}
    />
  );
};

export default LeftbarItem;
