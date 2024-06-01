import DanteAndPlace from "../DateAndPlace/DateAndPlace";
import Header from "../Header/Header";
import PlayersList from "../PlayersList/PlayersList";

export default function Schedule() {
  return (
    <div className="flex max-w-2xl h-full shadow-2xl backdrop-blur-md rounded-xl p-7 bg-white/70 w-full flex-col">
      <Header />

      <div className="flex flex-col w-full items-center justify-center">
        <DanteAndPlace />

        <PlayersList />
      </div>
    </div>
  );
}
