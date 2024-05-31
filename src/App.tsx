import "./App.css";
import { AppLayout } from "./components/AppLayout";
import ClerkLogin from "./components/ClerkLogin";

export default function App() {
  return (
    <AppLayout>
      {/* <Login /> */}
      <ClerkLogin />
    </AppLayout>
  );
}
