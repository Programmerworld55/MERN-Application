import { useState } from "react";
import {useNavigate} from "react-router-dom";


function CreatePost() {
    const navigate=useNavigate()
  const [FormData, SetformData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [alert, setAlert] = useState({
    message: "",
    type: "" // 'success' or 'error'
  });

  function HandleForm(event) {
    const { name, value } = event.target;
    SetformData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    const apiUrl = "http://localhost:5500/api"; // Replace with your backend API URL

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
        navigate("/AllPosts")

        
        setAlert({
          message: "Data saved successfully!",
          type: "success"
        });

        setTimeout(() => {
          setAlert({
            message: "",
            type: ""
          });
        }, 3000);

        SetformData({
          name: "",
          email: "",
          age: ""
        });
      } else {
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      setAlert({
        message: "An error occurred while submitting the form.",
        type: "error"
      });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">User Information</h2>
        
        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}

        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={FormData.name}
              onChange={HandleForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={FormData.email}
              onChange={HandleForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={FormData.age}
              onChange={HandleForm}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
