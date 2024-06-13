import {
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { FiveList } from "./components/FiveList/FiveList";
import Header from "./components/Header/Header";
import OnSignup from "./components/OnSignup/OnSignup";
import PlayersList from "./components/PlayersList/PlayersList";

export default function App() {
  return (
    <div
      className={`w-screen md:p-20 p-5 min-h-screen h-screen justify-center flex ${styles.background}`}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>

                <SignedIn>
                  <div className="flex max-w-2xl min-h-[420px] h-fit shadow-2xl backdrop-blur-md rounded-xl p-7 bg-white/70 w-full flex-col">
                    <Header />
                    <FiveList />
                  </div>
                </SignedIn>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                forceRedirectUrl="/onsignup"
                signInForceRedirectUrl="/onsignin"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                forceRedirectUrl="/onsignin"
                signUpForceRedirectUrl="/onsignup"
              />
            }
          />

          <Route path="/onsignin" element={<OnSignup />} />
          <Route path="/onsignup" element={<OnSignup />} />
          <Route
            path="/fives/:id"
            element={
              <div className="flex max-w-2xl min-h-[420px] h-fit shadow-2xl backdrop-blur-md rounded-xl p-7 bg-white/70 w-full flex-col">
                <Header />
                <PlayersList />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
