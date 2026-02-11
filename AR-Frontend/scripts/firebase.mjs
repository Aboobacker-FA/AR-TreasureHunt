import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
// import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.1/axios.min.js"

const firebaseConfig = {
  apiKey: "AIzaSyD2hsq_Ikc4sSrrU6i_KyEJt0Rs-UeZfIA",
  authDomain: "ar-tressure.firebaseapp.com",
  projectId: "ar-tressure",
  storageBucket: "ar-tressure.firebasestorage.app",
  messagingSenderId: "1020170900446",
  appId: "1:1020170900446:web:a25542d340fd7f4c54c34f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

console.log("firebase.mjs loaded");

document.getElementById("loginform").addEventListener("submit", loginFirebase);

function loginFirebase(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      let accessToken;
      user.getIdTokenResult().then(async (tokenResult) => {
        const { token } = tokenResult;
        accessToken = token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("uid", user.uid);

        const headers = {
          Authorization: accessToken,
          uid: user.uid,
        };

        window.location.replace("/page3/index.html");
        await axios.post(
          "https://ar-backend-seven.vercel.app/api/v1/login",
          { name: user.email },
          { headers }
        );
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage);
    });
}
