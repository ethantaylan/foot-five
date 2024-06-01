import Profil from "../Profil/Profil";

export default function Header() {
  return (
    <div className="flex mb-2 justify-between">
      <button className="font-black text-xl">FIVE ⚽</button>
      <Profil />
    </div>
  );
}
