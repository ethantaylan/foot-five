import { ChangeEvent, FC, useEffect, useState } from "react";
import { Modals } from "../../constants/Modals";
import { HiddenCloseModalButton } from "../HiddenCloseModalButton/HiddenCloseModalButton";
import { FivePlaces } from "../../constants/FivePlaces";
import { closeModal } from "../../utils/CloseModal";
import { useSupabase } from "../../hooks/useSupabase";
import { FivePlayerResponse } from "../../models/FivePlayer";
import { supabase } from "../../supabase";
import { useGlobalStore } from "../../context";

export interface EditFiveModalProps {
  onConfirm: () => void;
}

export const EditFiveModal: FC<EditFiveModalProps> = ({ onConfirm }) => {
  const [fiveDate, setFiveDate] = useState<string>("");
  const [fivePlace, setFivePlace] = useState<string>("");
  const [fiveOtherPlace, setFiveOtherPlace] = useState<string>("");
  const [fiveDuration, setFiveDuration] = useState<string>("");

  const { five } = useGlobalStore();

  const handleIsFiveValid = () => {
    const selectedDate = new Date(fiveDate);
    const now = new Date();

    if (selectedDate < now) {
      return true;
    }
    return false;
  };

  const updateFiveFetch = useSupabase<FivePlayerResponse[]>(
    () =>
      supabase
        .from("fives")
        .update({
          place: fivePlace === FivePlaces.AUTRE ? fiveOtherPlace : fivePlace,
          date: fiveDate,
          duration: fiveDuration,
        })
        .eq("id", five?.id)
        .select(),
    false
  );

  useEffect(() => {
    if (five) {
      setFiveDate(five.date);
      setFiveDuration(five.duration);
      setFivePlace(five.place);
    }
  }, [five, updateFiveFetch.response]);

  return (
    <dialog id={Modals.EDIT_FIVE_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">Modification du five</h3>

        <div className="mb-5">
          <label htmlFor="set-five-date" className="label-text">
            Date
          </label>
          <input
            value={fiveDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFiveDate(event.target.value)
            }
            name="set-five-date"
            className="input input-bordered input-sm w-full"
            type="datetime-local"
          />
          {handleIsFiveValid() && (
            <p className="text-red-500">La date sélectionnée est passée.</p>
          )}
        </div>

        <div>
          <label htmlFor="set-five-place" className="label-text">
            Lieu
          </label>
          <select
            value={fivePlace}
            name="set-five-place"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setFivePlace(event.target.value)
            }
            className="select select-sm select-bordered w-full"
          >
            <option disabled defaultValue={fivePlace}>
              {fivePlace}
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
              className={`input input-bordered w-full input-sm mt-3 ${
                fiveOtherPlace.length === 0 && "border-red-500"
              }`}
              placeholder="Lieu..."
            />
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
                className={`tab font-bold ${
                  duration === fiveDuration && "tab-active"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full gap-2 justify-end mt-6">
          <button
            disabled={
              fiveDate.length === 0 ||
              fivePlace.length === 0 ||
              (fivePlace === FivePlaces.AUTRE && fiveOtherPlace.length === 0) ||
              handleIsFiveValid()
            }
            onClick={() =>
              updateFiveFetch.executeFetch().then(() => {
                onConfirm();
                closeModal(Modals.EDIT_FIVE_MODAL);
              })
            }
            className="btn btn-sm btn-primary rounded"
          >
            Modifier
          </button>
        </div>
      </div>

      <HiddenCloseModalButton />
    </dialog>
  );
};
