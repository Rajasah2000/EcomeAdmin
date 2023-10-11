import HttpClientXml from "../Utils/HttpClientXml";


async function login(data){
  const endpoind="login";
  return HttpClientXml.post(endpoind,data);
}

async function SignUp(data){
  const endpoind="register";
  return HttpClientXml.post(endpoind,data);
}

async function AdminProfile(){
  const endpoind="view-Profile";
  return HttpClientXml.get(endpoind);
}


  export default {
    login,
    SignUp,
    AdminProfile
  }