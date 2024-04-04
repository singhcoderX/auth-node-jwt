import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.email && formData.password) {
      setLoading(true);
      axios.defaults.withCredentials = true; // allow cookies to be sent in cross-origin requests
      axios
        .post("http://localhost:8080/login", formData)
        .then((res) => {
          navigate("/");
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
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.valid) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        {loading ? <CircularProgress /> : <Button type="submit">Login</Button>}
        <Button
          variant="text"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Login;
