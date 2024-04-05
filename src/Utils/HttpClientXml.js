import { reactLocalStorage } from "reactjs-localstorage";
const BASE_URL = 'localhost:4000/api/admin/';

const ALLOW_ORIGIN = 'admin.bushidophilanthropy.org';
const USER_TYPE = "Admin";

function get(endpoint, params) {
  return requestData(endpoint, params);
}

function post(endpoint, params) {
  return requestData(endpoint, params, "POST");
}

function put(endpoint, params) {
  return requestData(endpoint, params, "PUT");
}

function deletemethod(endpoint, params) {
  return requestData(endpoint, params, "DELETE");
}

async function requestData(url, data = {}, method = "GET") {
  // console.log('khankidata',data)
  let xhr = new XMLHttpRequest();
  xhr.open(method, BASE_URL + url);
  if (checkingAuth()) xhr.setRequestHeader("authorization", checkingAuth());
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  xhr.setRequestHeader("userType", USER_TYPE);

  return new Promise((resolve, reject) => {
    // console.log("string mal", JSON.stringify(data));
    if (method == "GET") {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
    xhr.onload = () => {  
      console.log(xhr.status);
      let response = JSON.parse(xhr.response);
      console.log(response);

      if (
        xhr.status === 200 ||
        xhr.status === 400 ||
        xhr.status === 403 ||
        xhr.status === 500 ||
        xhr.status === 406
      ) {
        resolve(response);
      } else {
        reject(response);
      }
    };
  });
}

// async function fileUpload(url, file) {
//   var xhr = new XMLHttpRequest();
//   // xhr.upload.onprogress = function (event) {
//   //   // console.log(`Uploaded ${event.loaded} of ${event.total}`);
//   //   let percent = (event.loaded * 100) / event.total;
//   //   callback(percent);
//   // };

//   xhr.onloadend = function () {
//     if (xhr.status == 200) {
//       console.log("Success");
//     } else {
//       console.log("error");
//     }
//   };

//   xhr.open("post", BASE_URL + url);
//   if (checkingAuth()) xhr.setRequestHeader("Authorization", checkingAuth());
//   xhr.setRequestHeader("Content-Type", "multipart/form-data");
//   xhr.setRequestHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
//   xhr.setRequestHeader("userType", USER_TYPE);
//   return new Promise((resolve, reject) => {
//     xhr.send(file);
//     xhr.onload = () => {
//       let response = JSON.parse(xhr.response);
//       console.log(response);
//       resolve(response);
//     };
//   });
// }

// async function fileUplode(url,method, file, object_get = {}, tokenCustom = null) {

// console.log(file);
// console.log(file.name);
//   var data = new FormData();
//   data.append("doc", file, file.name);

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;
//   console.log("Data", data);
//   xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open("POST", url);
//   xhr.setRequestHeader("Authorization", checkingAuth());
//   xhr.setRequestHeader("userType", USER_TYPE);

//   return new Promise((resolve, reject) => {
//     console.log("string mal", JSON.stringify(data));
//     if (method == "GET") {
//       xhr.send();
//     } else {
//       xhr.send(JSON.stringify(data));
//     }
//     xhr.onload = () => {
//       console.log(xhr.status);
//       let response = JSON.parse(xhr.response);
//       console.log(response);

//       if (xhr.status === 200 || xhr.status === 400) {
//         resolve(response);
//       }
//       else{
//         reject(response)
//       }
//     };
//   });
// }

async function fileUplode(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let token = "";
  let user = reactLocalStorage.get("Auth");
  // console.log("UserTok", user);
  if (user && user != null && Object.keys(user).length > 0) {
    token = user;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });

  if (token != "") {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: "Admin",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  // for (var pair of file.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: "follow",
    headers: headers,
  })
    .then((response) => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      (result) => {
        console.log("ResponIMG", result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

async function fileVideoUplode(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null
) {
  let token = "";
  let user = reactLocalStorage.get("Auth");
  // console.log("UserTok", user);
  if (user && user != null && Object.keys(user).length > 0) {
    token = user;
  }
  // let bash_url = "http://13.127.101.102:5011/api/v1/";
  let apiUrl = BASE_URL + url;
  // let data = new FormData();
  // data.append("image", file);
  // Object.keys(object_get).forEach(function (key) {
  //   let ddd = object_get[key];
  //   data.append(key, ddd);
  // });

  if (token != "") {
    var toooo = token;
  }
  //  console.log("tokenn",toooo);
  let headers = {
    // 'Accept': 'application/json',
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "http://13.127.101.102:5008",
    authorization: toooo,
    userType: "Admin",
    // 'Authorization': 'Bearer ' + login_status,
  };

  // Display the key/value pairs
  // for (var pair of file.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  return await fetch(apiUrl, {
    method: method,
    body: file,
    redirect: "follow",
    headers: headers,
  })
    .then((response) => {
      // console.log("responseee", response, headers);
      return response.json();
    })
    .then(
      (result) => {
        console.log("ResponIMG", result);
        return result;
      },
      (error) => {
        return error;
      }
    );
}

function checkingAuth() {
  let token = localStorage.getItem("Auth");
  console.log("TOKEn", token);

  if (token) {
    return token;
  }
  return false;
}

export default {
  requestData,
  get,
  post,
  put,
  deletemethod,
  fileUplode,
  fileVideoUplode,
};
