import Profil from "../Profil/Profil";

export default function Header() {
  return (
    <div className="navbar justify-between">
      <button className="btn btn-ghost font-bold text-xl">FIVE ⚽</button>
      <Profil />
    </div>
  );
}
