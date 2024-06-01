import { ChangeEvent, FC, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { supabase } from "../../supabase";
import { closeModal } from "../../utils/ShowModal";
import { useUser } from "@clerk/clerk-react";
import { FivesResponse } from "../../models/Fives";

export interface NewFiveModalProps {
  onConfirm: () => void;
}

export const NewFiveModal: FC<NewFiveModalProps> = ({ onConfirm }) => {
  // const { setFiveDate, setFivePlace, fiveDate, fivePlace } = useGlobalStore();

  const [fiveDate, setFiveDate] = useState<string>('');
  const [fivePlace, setFivePlace] = useState<string>('');

  const { user } = useUser();

  const handlePlaceUrl = () => {
    switch (fivePlace) {
      case "LE FIVE Bobigny - Bobigny":
        return "https://maps.app.goo.gl/UEhrap3zoA1EDMKS8";

      case "OHSPORT - Tremblay-en-France":
        return "https://maps.app.goo.gl/cBg6EFvPY7JkrQfN7";

      case "Autre":
        return "";
    }
  };

  const addNewFiveFetch = useSupabase<FivesResponse[]>(
    () =>
      supabase
        .from("fives")
        .insert([
          {
            date: fiveDate,
            place: fivePlace,
            place_url: handlePlaceUrl(),
            organizer: user?.fullName || user?.username,
          },
        ])
        .select(),
    false
  );

  return (
    <dialog id="newFiveModal" className="modal">
      <div className="modal-box">
        <div className="flex mb-5 items-center justify-between">
          <h3 className="font-bold text-lg">Nouveau five</h3>
        </div>

        <div className="mb-5">
          <label className="label-text">Date</label>
          <input
            value={fiveDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setFiveDate(event.target.value)
            }
            className="input input-bordered input-sm w-full"
            type="date"
          />
        </div>

        <div>
          <label className="label-text">Lieu</label>

          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setFivePlace(event.target.value)
            }
            className="select select-sm select-bordered w-full"
          >
            <option disabled selected>Selectionner le lieu</option>

            <option>OHSPORT - Tremblay-en-France</option>
            <option>LE FIVE Bobigny - Bobigny</option>
            <option>Autre</option>
          </select>
        </div>
        <div className="flex w-full gap-2 justify-end mt-6">
          <form method="dialog">
            <button className="btn btn-sm btn-ghost">Annuler</button>
          </form>

          <button
            disabled={fiveDate.length === 0 || fivePlace.length === 0}
            onClick={() =>
              addNewFiveFetch.executeFetch().then(() => {
                onConfirm();
                closeModal("newFiveModal");
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

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
