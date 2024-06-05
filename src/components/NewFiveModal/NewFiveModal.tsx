import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSupabase } from "../../hooks/UseSupabase";
import { supabase } from "../../supabase";
import { useUser } from "@clerk/clerk-react";
import { Players, PlayersResponse } from "../../models/Player";
import { Modals } from "../../constants/Modals";
import { FiveResponse } from "../../models/Five";
import { FivePlaces } from "../../constants/FivePlaces";
import { HiddenCloseModalButton } from "../HiddenCloseModalButton/HiddenCloseModalButton";
import { closeModal } from "../../utils/CloseModal";

export interface NewFiveModalProps {
  onConfirm: () => void;
}

export const NewFiveModal: FC<NewFiveModalProps> = ({ onConfirm }) => {
  const [fiveDate, setFiveDate] = useState<string>("");
  const [fivePlace, setFivePlace] = useState<string>("");
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
          },
        ])
        .select(),
    false
  );

  return (
    <dialog id={Modals.NEW_FIVE_MODAL} className="modal">
      <HiddenCloseModalButton />

      <div className="modal-box">
        <div className="flex mb-5 items-center justify-between">
          <h3 className="font-bold text-lg">Nouveau five</h3>
        </div>

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
            type="date"
          />
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
            disabled={fiveDate.length === 0 || fivePlace.length === 0}
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
