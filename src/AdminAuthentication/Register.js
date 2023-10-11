import React from "react";
import { useState, useMemo } from "react";
import Authservice from "../Service/Authservice";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const validation = useMemo(() => {
    if (email !== "" && email.match(mailFormat) && password !== "" && password.length >= 6 && emailError == "" && passwordError == "") {
      return true
    } else {
      return false
    }
  }, [email, password, emailError, passwordError])

  const EmailChecking = () => {
    if (email == "") {
      setEmailError("Email field cannot be blank.")
    } else if (email && !email.match(mailFormat)) {
      setEmailError("Please enter  valid email.")
    } else {
      setEmailError("");
    }
  }

  const PasswordChecking = () => {
    if (password == "") {
      setPasswordError("Password field cannot be blank.")
    } else if (password && password.length < 6) {
      setPasswordError("Password length must be greater than 5.")
    } else {
      setPasswordError("");
    }
  }
  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (validation) {
      let data = {
        email: email,
        password: password
      }
      Authservice.SignUp(data)
        .then((res) => {
          if (res && res?.status) {
            toast.success("Registered Successfully");
            setEmail("");
            setPassword("");
            navigate("/login")
          } else {
            toast.error(res?.message)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      EmailChecking();
      PasswordChecking();
    }

  };
  return (
    <div>
      <>
        <section className="text-center">
          <div
            className="p-5 bg-image"
            style={{
              backgroundImage:
                'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
              height: 250,
            }}
          />

          <div
            className="card mx-4 mx-md-5 shadow-5-strong"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="card-body py-5 px-md-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-5">Register now</h2>
                  <form>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {emailError && <p style={{ color: "red", float: "left" }}>{emailError}</p>}


                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password..."
                      />

                    </div>
                    {passwordError && <p style={{ color: "red", float: "left" }}>{passwordError}</p>}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      // onClick={(e) => SubmitHandler(e)}
                    >
                      Sign up
                    </button>

                    <p style={{ color: "#393f81", marginRight: "0.4rem" }}>
                      Allready have an account?{" "}
                      <a
                        href="/Login"
                        style={{ color: "green", marginLeft: "0.2rem" }}
                      >
                        SignIn here
                      </a>
                    </p>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default Register