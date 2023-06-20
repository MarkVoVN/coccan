"use client";

import {
  loginUser,
  useAppSelector,
} from "@/app/GlobalRedux/Features/userSlice";
import { Button, ThemeProvider, Typography } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import app from "../../firebase";
import "./style.scss";
import React from "react";
import useStorage from "@/hooks/useStorage";
import theme from "../(customers)/theme";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const userInfo = {
          displayName: user.displayName as string | undefined,
          email: user.email as string | undefined,
          photoURL: user.photoURL as string | undefined,
          uid: user.uid,
          refreshToken: user.refreshToken,
          preferedLocationId: "-1", //TODO: fetch BE api to get this field
          balance: -1,
        };

        dispatch(loginUser({ value: userInfo }));
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { getItem, setItem, removeItem } = useStorage();

  //if user is saved in session, proceed to login user
  React.useEffect(() => {
    const userInfoString = getItem("userInfo");
    if (!userInfoString) return;

    const userInfo = JSON.parse(userInfoString);
    dispatch(loginUser({ value: userInfo }));
    router.push("/");
  }, []);

  const displayName = useAppSelector((state) => state.user.value.displayName);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="background">
          <div className="container">
            <div className="content">
              <div className="logo">
                <svg
                  width="104"
                  height="125"
                  viewBox="0 0 104 125"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_7_97"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="104"
                    height="125"
                  >
                    <path d="M0.5 0H103.5V125H0.5V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_7_97)">
                    <path
                      d="M66.9583 42.3906C68.2865 38.9844 67.6198 34.9948 64.8021 32.2552L51.1302 18.4636C50.3854 17.7136 49.224 17.7136 48.4792 18.4636C47.7344 19.2084 47.7344 20.375 48.4792 21.1198L55.9375 28.599C56.6823 29.349 56.6823 30.5938 55.9375 31.2604C55.1927 32.0052 54.0313 32.0052 53.2865 31.2604L45.8281 23.7813C45.0833 23.0313 43.9219 23.0313 43.1771 23.7813C42.4323 24.5261 42.4323 25.6927 43.1771 26.4375L50.6354 33.9167C51.3802 34.6667 51.3802 35.8281 50.6354 36.5729C50.2188 36.9896 49.8073 37.1563 49.3073 37.1563C48.8125 37.1563 48.3125 36.9896 47.9844 36.5729L40.526 29.099C39.7813 28.349 38.6198 28.349 37.875 29.099C37.5417 29.4323 37.2917 29.9271 37.2917 30.4271C37.2917 30.9271 37.4583 31.4219 37.875 31.7552L51.6302 45.5469C54.3646 48.2917 58.3438 49.0365 61.7396 47.7084L89.6615 75.4584C89.25 76.125 88.8333 76.7865 88.3385 77.4531C86.9271 79.4479 85.3542 81.3594 83.5312 83.1042L52.0417 114.677L20.7188 83.2709C12.2708 74.875 7.71354 63.6615 7.71354 51.7813C7.71354 47.375 8.375 43.1406 9.53646 38.9844C9.61979 38.8177 9.61979 38.5677 9.69792 38.4011L35.8854 64.2448C34.3125 69.0625 36.6302 75.9584 42.0156 81.4427C48.8125 88.2552 57.8438 90.1667 62.3177 85.6771C66.7083 81.2761 64.8021 72.1354 58.0938 65.3229C52.625 59.9219 45.7448 57.5938 40.9375 59.1719L12.6823 31.3386C14.7552 27.3542 17.4062 23.6146 20.7188 20.375C29.0885 11.9844 40.1927 7.32815 52.0417 7.32815C63.8906 7.32815 74.9948 11.9844 83.4479 20.375C91.8177 28.7656 96.4583 39.9792 96.4583 51.8646C96.4583 57.6771 95.3802 63.2448 93.2292 68.4792L66.9583 42.3906ZM88.4219 15.3073C78.724 5.58335 65.7969 0.182312 52.0417 0.182312C38.2865 0.182312 25.3594 5.58335 15.6667 15.3073C12.4323 18.5469 9.61979 22.2031 7.38021 26.1042C7.13021 26.5209 6.88021 26.9375 6.63542 27.4375C5.64062 29.1823 4.8125 31.0104 4.06771 32.9219C3.98438 33.0834 3.90104 33.25 3.81771 33.5C1.66146 39.3177 0.5 45.4636 0.5 51.8646C0.5 65.6563 5.89063 78.6146 15.5833 88.3386L52.0417 124.813L88.4219 88.3386C90.1615 86.5938 91.8177 84.6823 93.3073 82.6875C93.8073 82.0209 94.224 81.4427 94.7188 80.7761C95.4635 79.6979 96.2083 78.5313 96.7917 77.3698C97.4531 76.2084 98.0312 75.0417 98.6146 73.8802C101.844 67.0677 103.5 59.5886 103.5 51.8646C103.5 37.9896 98.1979 25.0261 88.4219 15.3073Z"
                      fill="#FF7B54"
                    />
                  </g>
                </svg>
                <div className="title">COCCAN</div>
              </div>
              <Button className="button" variant="contained" onClick={login}>
                <Typography variant="h5" fontWeight="500">
                  Sign in with FPT mail
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default LoginPage;
