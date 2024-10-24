import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import { toast } from 'react-toastify';
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";
import "./ToggleLogin.css";

const handleCompanyGoogleSignup = async (navigate) => {
  try {
    const authData = await pb.collection('company').authWithOAuth2({
      provider: 'google',
      redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
    });
    navigate("/company-dashboard");
  } catch (error) {
    toast.error("Google Signup failed! Please try again.");
    console.error("OAuth signup failed:", error);
  }
};

const handleEmployeeGoogleSignup = async (navigate) => {
  try {
    const authData = await pb.collection('employee').authWithOAuth2({
      provider: 'google',
      redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
    });
    navigate("/employee-dashboard");
  } catch (error) {
    toast.error("Google Signup failed! Please try again.");
    console.error("OAuth signup failed:", error);
  }
};

const handleCompanyPasswordSignup = async (event, navigate) => {
  event.preventDefault();
  const companyID = document.getElementById('company_id').value;
  const companyPass = document.getElementById('company_pass').value;

  try {
    const authData = await pb.collection('company').create({
      "email": companyID,
      "password": companyPass,
      "passwordConfirm": companyPass
    });
    toast.success("Company registered successfully!");
    navigate("/company-dashboard");
  } catch (error) {
    toast.error("Signup failed! Please try again.");
    console.error("Password signup failed:", error);
  }
};

const handleEmployeePasswordSignup = async (event, navigate) => {
  event.preventDefault();
  const empID = document.getElementById('emp_id').value;
  const empPass = document.getElementById('emp_pass').value;
  const data = {
    "email": empID,
    "password": empPass,
    "passwordConfirm": empPass
  }
  try {
    const authData = await pb.collection('employee').create(data);
    toast.success("Employee registered successfully!");
    navigate("/employee-dashboard");
  } catch (error) {
    toast.error("Signup failed! Please try again.");
    console.error("Password signup failed:", error);
  }
};

const SignupTabs = () => {
  useRedirectIfLoggedIn();
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="outer-box">
      <div className="tabs-container">
        <div className="tab-menu">
          <button
            className={`tab ${activeTab === "company" ? "active" : ""}`}
            onClick={() => handleTabClick("company")}
          >
            Company
          </button>
          <button
            className={`tab ${activeTab === "employee" ? "active" : ""}`}
            onClick={() => handleTabClick("employee")}
          >
            Employee
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "company" ? (
            <CompanySignupForm navigate={navigate} />
          ) : (
            <EmployeeSignupForm navigate={navigate} />
          )}
        </div>
      </div>
    </div>
  );
};

const CompanySignupForm = ({ navigate }) => (
  <form id="company_signup_form" onSubmit={(event) => handleCompanyPasswordSignup(event, navigate)}>
    <h2>Company Signup</h2>
    <input id="company_id" type="text" placeholder="Email" required />
    <input id="company_pass" type="password" placeholder="Password" required />
    <button className="form_login" type="submit">Signup</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={() => handleCompanyGoogleSignup(navigate)}>Signup with Google</button> 
    </div>
    <br/>
    <a className="forgot-password-link">Already have an account? </a><a href="/" className="forgot-password-link" ><b>Login Here</b></a>
  </form>
);

const EmployeeSignupForm = ({ navigate }) => (
  <form id="employee_signup_form" onSubmit={(event) => handleEmployeePasswordSignup(event, navigate)}>
    <h2>Employee Signup</h2>
    <input id="emp_id" type="text" placeholder="Email" required />
    <input id="emp_pass" type="password" placeholder="Password" required />
    <button className="form_login" type="submit">Signup</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={() => handleEmployeeGoogleSignup(navigate)}>Signup with Google</button> 
    </div>
    <br/>
    <a className="forgot-password-link">Already have an account? </a><a href="/" className="forgot-password-link" ><b>Login Here</b></a>
  </form>
);

export default SignupTabs;
