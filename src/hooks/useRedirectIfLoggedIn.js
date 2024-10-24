import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase"; 
import { toast } from 'react-toastify';

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a company is logged in
    const companyAuth = pb.authStore.model && pb.authStore.model.collectionName === 'company';
    const employeeAuth = pb.authStore.model && pb.authStore.model.collectionName === 'employee';

    if (companyAuth) {
      toast.error("You are already logged in as a company.");
      navigate("/company-dashboard");
    } else if (employeeAuth) {
      toast.error("You are already logged in as an employee.");
      navigate("/employee-dashboard");
    }
  }, [navigate]);
};

export default useRedirectIfLoggedIn;
