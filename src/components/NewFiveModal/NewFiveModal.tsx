import { ChangeEvent, FC, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useUser } from "@clerk/clerk-react";
import { Players, PlayersResponse } from "../../models/Player";
import { Modals } from "../../constants/Modals";
import { FiveResponse } from "../../models/Five";
import { FivePlaces } from "../../constants/FivePlaces";
import { HiddenCloseModalButton } from "../HiddenCloseModalButton/HiddenCloseModalButton";
import { closeModal } from "../../utils/CloseModal";
import { useSupabase } from "../../hooks/useSupabase";

export interface NewFiveModalProps {
  onConfirm: () => void;
}

export const NewFiveModal: FC<NewFiveModalProps> = ({ onConfirm }) => {
  const [fiveDate, setFiveDate] = useState<string>("");
  const [fivePlace, setFivePlace] = useState<string>("");
  const [fiveDuration, setFiveDuration] = useState<string>("0");
  const [player, setPlayer] = useState<Players>();

  const { user } = useUser();

  const handlePlaceUrl = () => {
    switch (fivePlace) {
      case FivePlaces.BOBIGNY:
        return "https://maps.app.goo.gl/UEhrap3zoA1EDMKS8";

      case FivePlaces.TREMBLAY:
        return "https://maps.app.goo.gl/cBg6EFvPY7JkrQfN7";

      case FivePlaces.AUTRE:
        return "";
    }
  };

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    true
  );

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayer(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  const handleIsFiveValid = () => {
    const selectedDate = new Date(fiveDate);
    const now = new Date();

    if (selectedDate < now) {
      return true;
    }
    return false;
  };

  const formattedFiveDuration = () => {
    switch (fiveDuration) {
      case "0":
        return "1h00";

      case "1":
        return "1h30";

      case "2":
        return "2h00";
    }
  };

  const addNewFiveFetch = useSupabase<FiveResponse[]>(
    () =>
      supabase
        .from("fives")
        .insert([
          {
            date: fiveDate,
            place: fivePlace,
            place_url: handlePlaceUrl(),
            organizer: player?.userName,
            duration: formattedFiveDuration(),
          },
        ])
        .select(),
    false
  );

  return (
    <dialog id={Modals.NEW_FIVE_MODAL} className="modal">
      <HiddenCloseModalButton />

      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">Nouveau five</h3>

        <div className="mb-5">
          <label htmlFor="set-five-date" className="label-text">
            Date
          </label>
          <input
            name="set-five-date"
            value={fiveDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFiveDate(event.target.value)
            }
            className="input input-bordered input-sm w-full"
            type="datetime-local"
          />
          {handleIsFiveValid() && (
            <p className="text-red-500">La date sélectionnée est passée.</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="set-five-duration" className="label-text">
            Durée
          </label>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFiveDuration(event.target.value)
            }
            type="range"
            min="0"
            max="2"
            value={fiveDuration}
            className="range"
            step="1"
          />

          <div className="w-full flex justify-between text-xs px-2">
            <span>1h00</span>
            <span>1h30</span>
            <span>2h00</span>
          </div>
        </div>

        <div>
          <label htmlFor="set-five-place" className="label-text">
            Lieu
          </label>
          <select
            name="set-five-place"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setFivePlace(event.target.value)
            }
            className="select select-sm select-bordered w-full"
          >
            <option disabled selected>
              Selectionner le lieu
            </option>

            {Object.values(FivePlaces).map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </div>

        <div className="flex w-full gap-2 justify-end mt-6">
          <button
            disabled={
              fiveDate.length === 0 ||
              fivePlace.length === 0 ||
              handleIsFiveValid()
            }
            onClick={() =>
              addNewFiveFetch.executeFetch().then(() => {
                onConfirm();
                closeModal(Modals.NEW_FIVE_MODAL);
                setFiveDate("");
                setFivePlace("");
              })
            }
            className="btn btn-sm btn-primary rounded"
          >
            Confirmer
          </button>
        </div>
      </div>

      <HiddenCloseModalButton />
    </dialog>
  );
};
