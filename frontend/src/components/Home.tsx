import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [user, setUser] = useState<any>("");
  const navigate = useNavigate();

  const handleLogOut = () => {
    setWaiting(true);
    axios.defaults.withCredentials = true;

    axios
      .delete("http://localhost:8080/logout")
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setWaiting(true);
      });
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        console.log("res", res);
        if (res.data.valid) {
          setUser(res.data.user);
          setLoading(false);
        } else {
          alert("Session Expired");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          Home
          <br />
          {!user && <Link to="signup">Sign Up</Link>}
          <br />
          {!user && <Link to="login">Login</Link>}
          <br />
          <br />
          <br />
          {user && (
            <>
              {" Logged In as"}
              <br />
              {user}
            </>
          )}
          <br />
          {user && (
            <>
              {waiting ? (
                <CircularProgress />
              ) : (
                <Button onClick={handleLogOut}>Log out</Button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
