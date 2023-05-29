"use client"

import React from 'react'
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase"
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      refreshToken: user.refreshToken,
    }
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(userInfo);
    const router = useRouter();
    router.push('/home');
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function LoginPage() {
  return (
    <>
        <div>Login</div>
        <Button variant="contained" onClick={login}>Log In</Button>
    </>
  )
}

export default LoginPage
