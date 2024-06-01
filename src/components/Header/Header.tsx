import Profil from "../Profil/Profil";

export default function Header() {
  return (
    <div className="flex mb-4 justify-between">
      <button className="font-bold text-xl">FIVE ⚽</button>
      <Profil />
    </div>
  );
}
