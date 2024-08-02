import { ChangeEvent, FC, useState } from "react";
import { supabase } from "../../../supabase";
import { Modals } from "../../../constants/Modals";
import { FiveResponse } from "../../../models/Five";
import { FivePlaces } from "../../../constants/FivePlaces";
import { HiddenCloseModalButton } from "../../Modal/HiddenCloseModalButton/HiddenCloseModalButton";
import { closeModal } from "../../../utils/CloseModal";
import { useSupabase } from "../../../hooks/useSupabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";

export interface NewFiveModalProps {
  onConfirm: () => void;
}

export const NewFiveModal: FC<NewFiveModalProps> = ({ onConfirm }) => {
  const [fiveDate, setFiveDate] = useState<string>("");
  const [fivePlace, setFivePlace] = useState<string>("");
  const [fiveOtherPlace, setFiveOtherPlace] = useState<string>("");
  const [fiveDuration, setFiveDuration] = useState<string>("0");

  const { playerInfo } = usePlayerInfoStore();

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

  const handleIsFiveDateValid = () => {
    const selectedDate = new Date(fiveDate);
    const now = new Date();

    if (selectedDate < now) {
      return true;
    }
    return false;
  };

  const addNewFiveFetch = useSupabase<FiveResponse[]>(
    () =>
      supabase
        .from("fives")
        .insert([
          {
            date: fiveDate,
            place: fivePlace === FivePlaces.AUTRE ? fiveOtherPlace : fivePlace,
            place_url: handlePlaceUrl(),
            organizer: {
              username: playerInfo?.userName,
              id: playerInfo?.userId,
            },
            duration: fiveDuration,
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
          {handleIsFiveDateValid() && (
            <p className="text-red-500">La date sélectionnée est passée.</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="set-five-duration" className="label-text">
            Durée
          </label>
          <div role="tablist" className="tabs tabs-boxed tabs-xs">
            {["1h00", "1h30", "2h00"].map((duration) => (
              <button
                onClick={() => setFiveDuration(duration)}
                key={duration}
                role="tab"
                className={`tab font-semibold ${
                  duration === fiveDuration && "tab-active"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="set-five-place" className="label-text">
            Lieu
          </label>
          <select
            value="no-selected"
            name="set-five-place"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setFivePlace(event.target.value)
            }
            className="select select-sm select-bordered w-full"
          >
            <option value="no-selected" disabled>
              Selectionner le lieu
            </option>

            {Object.values(FivePlaces).map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>

          {fivePlace === FivePlaces.AUTRE && (
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFiveOtherPlace(e.target.value)
              }
              type="text"
              className="input input-bordered w-full input-sm mt-3"
              placeholder="Lieu..."
            />
          )}
        </div>

        <div className="flex w-full gap-2 justify-end mt-6">
          <button
            onClick={() => closeModal(Modals.NEW_FIVE_MODAL)}
            className="btn btn-sm btn-ghost rounded"
          >
            Annuler
          </button>
          <button
            disabled={
              fiveDate.length === 0 ||
              fivePlace.length === 0 ||
              fiveDuration === "0" ||
              (fivePlace === FivePlaces.AUTRE && fiveOtherPlace.length === 0) ||
              handleIsFiveDateValid()
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
