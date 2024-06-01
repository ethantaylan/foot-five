import { useUser } from "@clerk/clerk-react";
import Login from "./components/Login/Login";
import Schedule from "./components/Schedule/Schedule";
import styles from "./App.module.css";

export default function App() {
  const { isSignedIn } = useUser();

  return (
    <div
      className={`w-screen md:p-20 p-5 h-screen justify-center flex ${styles.background}`}
    >
      {isSignedIn ? <Schedule /> : <Login />}
    </div>
  );
}
