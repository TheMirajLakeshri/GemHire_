import React, { useState, useEffect } from 'react';
import pb from "../lib/pocketbase";
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import './employee-detail.css';

const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [emptyFields, setEmptyFields] = useState([]);
  const [isProfileComplete, setIsProfileComplete] = useState(localStorage.getItem("isProfileComplete") === "true");

  useEffect(() => {
    if (!isProfileComplete) {
      fetchUserData();
    }
  }, [isProfileComplete]);

  const fetchUserData = async () => {
    const currentUser = pb.authStore.model;

    if (!currentUser) {
      toast.error("User is not authenticated.");
      return;
    }

    // Check for empty fields
    const emptyFields = Object.keys(currentUser).filter(field => !currentUser[field]);
    if (emptyFields.length > 0) {
      setFormData(emptyFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}));
      setEmptyFields(emptyFields);
      setIsVisible(true);
    } else {
      // Set profile as complete if no empty fields are found
      localStorage.setItem("isProfileComplete", "true");
      setIsProfileComplete(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = emptyFields.reduce((acc, field) => ({
        ...acc,
        [field]: formData[field]
      }), {});

      await pb.collection('employee').update(pb.authStore.model.id, updatedData);
      toast.success("Profile updated successfully!");
      localStorage.setItem("isProfileComplete", "true");
      setIsProfileComplete(true);
      setIsVisible(false);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={handleClose}>
          <X size={24} />
        </button>
        
        <div className="popup-header">
          <h2>Update Your Information</h2>
          <p>Please fill out the form below to complete your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          {emptyFields.includes("Name") && (
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {emptyFields.includes("DOB") && (
            <div className="form-group">
              <label htmlFor="DOB">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {emptyFields.includes("Phone_No") && (
            <div className="form-group">
              <label htmlFor="Phone_No">Phone Number</label>
              <input
                type="tel"
                id="Phone_No"
                name="Phone_No"
                value={formData.Phone_No}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {emptyFields.includes("Address") && (
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {emptyFields.includes("Adhaar_No") && (
            <div className="form-group">
              <label htmlFor="Adhaar_No">Aadhaar Number</label>
              <input
                type="text"
                id="Adhaar_No"
                name="Adhaar_No"
                value={formData.Adhaar_No}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {emptyFields.includes("Sex") && (
            <div className="form-group">
              <label htmlFor="Sex">Sex</label>
              <select
                id="Sex"
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
