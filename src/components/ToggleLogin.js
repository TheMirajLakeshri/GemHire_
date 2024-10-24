import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import { toast } from 'react-toastify';
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";
import "./ToggleLogin.css";

const handleCompanyGoogleLogin = async (navigate) => {
  try {
    await pb.collection('company').authWithOAuth2({
      provider: 'google',
      redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
    });
    toast.success("login success !");
    navigate("/company-dashboard");
  } catch (error) {
    toast.error("Google Login failed! Please try again.");
    console.error("OAuth login failed:", error);
  }
};

const handleEmployeeGoogleLogin = async (navigate) => {
  try {
    await pb.collection('employee').authWithOAuth2({
      provider: 'google',
      redirectUrl: 'http://127.0.0.1:8090/api/oauth2-redirect',
    });
    toast.success("login success !");
    navigate("/employee-dashboard");
  } catch (error) {
    toast.error("Google Login failed! Please try again.");
    console.error("OAuth login failed:", error);
  }
};

const handleCompanyPasswordLogin = async (event, navigate) => {
  event.preventDefault();
  const companyID = document.getElementById('company_id').value;
  const companyPass = document.getElementById('company_pass').value;

  try {
    await pb.collection('company').authWithPassword(companyID, companyPass);
    toast.success("login success !");
    navigate("/company-dashboard");
  } catch (error) {
    toast.error("Login failed! Please try again.");
    console.error("Password login failed:", error);
  }
};

const handleEmployeePasswordLogin = async (event, navigate) => {
  event.preventDefault();
  const empID = document.getElementById('emp_id').value;
  const empPass = document.getElementById('emp_pass').value;

  try {
    await pb.collection('employee').authWithPassword(empID, empPass);
    toast.success("login success !");
    navigate("/employee-dashboard");
  } catch (error) {
    toast.error("Login failed! Please try again.");
    console.error("Password login failed:", error);
  }
};

const LoginTabs = () => {
  useRedirectIfLoggedIn();
  const [activeTab, setActiveTab] = useState("company");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState(""); // For distinguishing between company and employee
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPasswordClick = (type) => {
    setUserType(type); // Set user type (company or employee) for sending reset link
    setIsModalOpen(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
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
            <CompanyLoginForm
              navigate={navigate}
              handleForgotPasswordClick={() => handleForgotPasswordClick("company")}
            />
          ) : (
            <EmployeeLoginForm
              navigate={navigate}
              handleForgotPasswordClick={() => handleForgotPasswordClick("employee")}
            />
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <ForgotPasswordModal
          closeModal={closeModal}
          userType={userType}
        />
      )}
    </div>
  );
};

const CompanyLoginForm = ({ navigate, handleForgotPasswordClick }) => (
  <form id="company_login_form" onSubmit={(event) => handleCompanyPasswordLogin(event, navigate)}>
    <h2>Company Login</h2>
    <input id="company_id" type="text" placeholder="Company ID or Email" required />
    <input id="company_pass" type="password" placeholder="Password" required />
    <button className="form_login" type="submit">Login</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={() => handleCompanyGoogleLogin(navigate)}>Login with Google</button> 
    </div>
    <a className="forgot-password-link">Need to Register? </a><a href="/signup" className="forgot-password-link" ><b>Create A New Account</b></a><br/>
    <a className="forgot-password-link">Forgot Your Password? </a><a href="#" className="forgot-password-link" onClick={handleForgotPasswordClick}><b>Reset Password</b></a>
  </form>
);

const EmployeeLoginForm = ({ navigate, handleForgotPasswordClick }) => (
  <form id="employee_login_form" onSubmit={(event) => handleEmployeePasswordLogin(event, navigate)}>
    <h2>Employee Login</h2>
    <input id="emp_id" type="text" placeholder="Employee ID or Email" required />
    <input id="emp_pass" type="password" placeholder="Password" required />
    <button className="form_login" type="submit">Login</button>
    <div className="google-login">
      <button className="login-with-google-btn" type="button" onClick={() => handleEmployeeGoogleLogin(navigate)}>Login with Google</button> 
    </div>
    <a className="forgot-password-link">Need to Register? </a><a href="/signup" className="forgot-password-link" ><b>Create A New Account</b></a><br/>
    <a className="forgot-password-link">Forgot Your Password? </a><a href="#" className="forgot-password-link" onClick={handleForgotPasswordClick}><b>Reset Password</b></a>
  </form>
);

const ForgotPasswordModal = ({ closeModal, userType }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await pb.collection(userType).requestPasswordReset(email);
      toast.success("Password reset link sent. Please check your email.");
      closeModal(); 
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Reset Password</h2>
        <form className="modal-form" onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // Clear error when user starts typing
            }}
            required
          />
          {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
          <button className="form_login" type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default LoginTabs;
