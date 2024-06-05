import { useUser } from "@clerk/clerk-react";
import Login from "./components/Login/Login";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { FiveList } from "./components/FiveList/FiveList";
import PlayersList from "./components/PlayersList/PlayersList";

export default function App() {
  const { isSignedIn } = useUser();

  return (
    <div
      className={`w-screen md:p-20 p-5 min-h-screen justify-center flex ${styles.background}`}
    >
      {isSignedIn ? (
        <div className="flex max-w-2xl min-h-[420px] h-fit shadow-2xl backdrop-blur-md rounded-xl p-7 bg-white/70 w-full flex-col">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<FiveList />} />
              <Route path="/:id" element={<PlayersList />} />
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
