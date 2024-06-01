import { useUser } from "@clerk/clerk-react";
import Login from "./components/Login/Login";
import Schedule from "./components/Schedule/Schedule";
import styles from "./App.module.css";

export default function App() {
  const { isSignedIn } = useUser();

  return (
    <div
      className={`w-screen md:p-20 p-5 items-center h-screen flex justify-center ${styles.background}`}
    >
      {isSignedIn ? <Schedule /> : <Login />}
    </div>
  );
}
