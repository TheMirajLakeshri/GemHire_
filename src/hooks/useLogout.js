import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    pb.authStore.clear(); 
    toast.success("Logged out successfully");
    navigate("/");
  };

  return logout;
};

export default useLogout;