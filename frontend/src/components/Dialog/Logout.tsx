import { Menu, MenuItem, MenuList } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { publicRequest } from "../../utils/axios";
interface ILogutDiologProps extends PropsWithChildren {}

const Logout: React.FC<ILogutDiologProps> = ({ children }) => {
  const { unsetAuth } = useAuth();
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await publicRequest.post("/api/auth/logout");
      unsetAuth();
      navigate("/login");
      toast.success("You are logged out, login again to access the app");
    } catch (error: any) {
      toast.error("Please cheack you netword");
    }
  };

  return (
    <Menu>
      {children}
      <MenuList>
        <MenuItem>Account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Logout;
