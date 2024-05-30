import "./App.css";
import { AppLayout } from "./components/AppLayout";
import ClerkLogin from "./components/ClerkLogin";

import { Login } from "./components/Login";

export default function App() {
  return (
    <AppLayout>
      {/* <Login /> */}
      <ClerkLogin />
    </AppLayout>
  );
}
