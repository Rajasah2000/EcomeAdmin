import React, { useMemo, useState } from "react";
import Authservice from "../Service/Authservice"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import bgimage from '../images/bgcover.jpg'

var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError , setEmailError] = useState("");
  const [passwordError , setPasswordError] = useState("");
  
  const navigate = useNavigate();

const validation = useMemo(()=>{
    if(email !== "" && email.match(mailFormat)&& password !== "" && password.length >=6 && emailError == "" && passwordError ==""    ){
        return true
    }else{
        return false
    }
},[email ,password , emailError , passwordError ])

const EmailChecking = () => {
    if(email == ""){
        setEmailError("Email field cannot be blank.")
    }else if( email  && !email.match(mailFormat)){
        setEmailError("Please enter  valid email.")
    }else{
        setEmailError("");
    }
}

const PasswordChecking = () => {
    if(password == ""){
        setPasswordError("Password field cannot be blank.")
    }else if(password && password.length < 6){
        setPasswordError("Password length must be greater than 5.")
    }else{
        setPasswordError("");
    }
}

const SubmitHandler = async (e) => {
    e.preventDefault();

    if(validation){
        let data ={
            email: email,
            password : password
        }
        Authservice.login(data)
        .then((res)=>{
            if(res && res?.status){
                toast.success(res?.message)
                setEmail("");
                setPassword("");
                reactLocalStorage.set("loginStatus", true);
                reactLocalStorage.set("Auth",res?.token);
                navigate("/");
            }else{
                toast.error(res?.message)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        EmailChecking();
        PasswordChecking();
    }
   
};

  return (
    <section style={{backgroundImage:`url('${bgimage}')`}} className="adminlogin">
     

      <div className="container py-5 ">
        <div className="row d-flex align-items-center justify-content-center ">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <h2 style={{margin:"2rem", textAlign:"center" , fontFamily:"auto" , color:'#6983cf',fontWeight:'700'}}>LOGIN HERE</h2>
            <form>
    
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form1Example13"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter Email"
                />
              </div>
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter Password"
                />
              </div>
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              <div className="d-flex justify-content-around align-items-center mb-4">

              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={(e) => SubmitHandler(e)}
              >
                Sign in
              </button>
              {/* <div
                className="divider d-flex align-items-center my-4"
                style={{ justifyContent: "center" }}
              >
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div> */}
{/* 
              <p  style={{ color: "#393f81" , marginRight:"0.4rem" }}>
                Don't have an account?{" "}
                <a
                  href="/register"
                  style={{ color: "green" , marginLeft: "0.2rem"}}
                >
                  Register here
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
