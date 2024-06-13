import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Profil from "../Profil/Profil";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex mb-2 justify-between">
      {!["/", "onsignup"].includes(pathname) && (
        <ArrowLeftIcon
          onClick={() => navigate("/")}
          className="size-6 cursor-pointer"
        />
      )}
      <button className="font-black text-xl">FIVE ⚽</button>
      <Profil />
    </div>
  );
}
