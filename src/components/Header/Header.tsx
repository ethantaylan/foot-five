import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Profil from "../Profil/Profil";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const { pathname } = useLocation();
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const secondes = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}:${secondes}`;
  };

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      setDate(formatDate(currentDate));
    };

    const intervalId = setInterval(updateDate, 1000);

    // Initial date update
    updateDate();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex mb-2 justify-between">
      {!["/", "onsignup"].includes(pathname) && (
        <ArrowLeftIcon
          onClick={() => navigate("/")}
          className="size-6 cursor-pointer"
        />
      )}
      <button className="font-black text-xl">FIVE ⚽</button>
      <div className="flex items-center">
        <span className="text-xs me-2 badge bg-opacity-65 rounded border shadow-md">{date}</span>
        <Profil />
      </div>
    </div>
  );
}
