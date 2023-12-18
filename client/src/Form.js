import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    age: "",
    selectedBatch: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handling Payment
  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.mobileNo ||
      !formData.age ||
      !formData.selectedBatch
    ) {
      alert("Please fill all the fields");
      return;
    }

    const userConfirmedPayment = window.confirm(
      "Are you sure you want to proceed with the payment?"
    );

    const paymentStatus = userConfirmedPayment;
    setPaymentStatus(paymentStatus);

    try {
      const response = await fetch(
        "https://yogaclasses-enrollment.onrender.com/paymentStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const isSuccess = await response.json();
      console.log("Payment success:", isSuccess);
    } catch (error) {
      console.error("Error:", error.message);
    }

    if (userConfirmedPayment) {
      window.alert("Payment successful");
    } else {
      window.alert("Payment canceled");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (
      !formData.name ||
      !formData.age ||
      !formData.selectedBatch ||
      !formData.mobileNo
    ) {
      alert("Please fill out all fields");
      return;
    }

    // Age validation
    const ageNumber = parseInt(formData.age, 10);
    if (isNaN(ageNumber) || ageNumber < 18 || ageNumber > 65) {
      alert("Age must be between 18 and 65"); // Show an alert if age validation fails
      return;
    }

    // Check payment status, if not completed then show alert
    if (!paymentStatus) {
      alert("Please complete the payment before submitting.");
      return;
    }

    // POST method for submitting data
    try {
      const response = await fetch(
        "https://yogaclasses-enrollment.onrender.com/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // Check the response from the server
      if (!responseData.success) {
        alert(responseData.message);
        return;
      }

      // Handle the success response here if needed
      console.log("Form submitted successfully");
      console.log("Response data:", responseData);
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enroll Today!</h1>
        <p>
          Join our Flexmoney's yoga classes and start your journey to wellness!
          Please fill out the form below to complete your enrollment.
        </p>
        <label htmlFor="name">
          Name: <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <div className="group-mobile-age-batch">
          <div className="mobileNo">
            <label htmlFor="mobileNo">
              Mobile Number: <span>*</span>
            </label>
            <input
              type="tel"
              name="mobileNo"
              id="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              pattern="\d{10}"
              required
            />
          </div>
          <br />
          <div className="age">
            <label htmlFor="age">
              Age: <span>*</span>
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              min={18}
              max={65}
              required
            />
          </div>
          <br />
          <div className="selectedBatch">
            <label htmlFor="selectedBatch">
              Select Batch: <span>*</span>
            </label>
            <select
              name="selectedBatch"
              id="selectedBatch"
              value={formData.selectedBatch}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Batch --</option>
              <option value="6-7AM">6-7 AM</option>
              <option value="7-8AM">7-8 AM</option>
              <option value="8-9AM">8-9 AM</option>
              <option value="5-6PM">5-6 PM</option>
            </select>
            <br />
          </div>
        </div>
        <button type="button" onClick={handlePayment} required>
          Pay 500 Rupees
        </button>
        <button type="submit" className="submit--button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
