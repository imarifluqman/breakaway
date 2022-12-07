import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setuser(user);
    } else {
      // User is signed out
      // ...
    }
  });
  async function adminLogin() {
    try {
      let ab = await signInWithEmailAndPassword(auth, email, password);
      console.log(ab.user);
      setuser(ab.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {user && <Navigate to="/addproduct" replace={true} />}

      <div className="loginBody">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-md-6 col-sm-6 col-12 bg-dark text-light py-5 my-5 rounded">
              <h1 className="text-center">Breakaway</h1>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-6 col-12 bg-light py-5 my-5 rounded">
              <div>
                <h2 className="text-center">Login</h2>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-10">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                    <label>Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                    <label>Password</label>
                  </div>
                  <div className="container-fluid d-flex justify-content-center my-4">
                    <button
                      type="submit"
                      onClick={() => {
                        adminLogin();
                      }}
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
