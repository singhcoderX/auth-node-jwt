import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      formData.email &&
      formData.firstName &&
      formData.firstName &&
      formData.lastName
    ) {
      setLoading(true);
      axios
        .post("http://localhost:8080/signup", formData)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setError(err.response.data.message);
          } else {
            setError("Backend Error");
          }
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit">Sign Up</Button>
        )}
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
