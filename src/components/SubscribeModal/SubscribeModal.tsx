import { ChangeEvent, FC, useEffect, useState } from "react";
import { Switch } from "../Switch/Switch";
import { supabase } from "../../supabase";
import { useSupabase } from "../../hooks/useSupa3";
import { useUser } from "@clerk/clerk-react";
import { PlayersResponse } from "../../models/Players";
import { useGlobalStore } from "../../context/store";
import { Alert } from "../Alert/Alert";

export interface SubscribeModalProps {
  onConfirm: () => void;
}

export const SubscribeModal: FC<SubscribeModalProps> = ({ onConfirm }) => {
  const { user } = useUser();
  const {
    players,
    substitutePlayers,
    setPlayerIsAlreadySubscribed,
    isUserAlreadySubscribed,
  } = useGlobalStore();

  const [isSubstitute, setIsSubstitute] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(
    user?.firstName ?? user?.username ?? ""
  );

  const subscribePlayerFetch = useSupabase<PlayersResponse[]>(
    () =>
      supabase.from("players").insert([
        {
          user_id: user?.id,
          first_name: firstName,
          last_name: user?.lastName,
          user_img: user?.imageUrl,
          email: user?.primaryEmailAddress?.emailAddress,
          is_substitute: isSubstitute,
        },
      ]),
    false
  );

  useEffect(() => {
    setPlayerIsAlreadySubscribed(
      players.some((player) => player.userId === user?.id) ||
        substitutePlayers.some((player) => player.userId === user?.id)
    );

    if (players.length === 10) {
      setIsSubstitute(true);
    }
  }, [players, substitutePlayers]);

  const handleConfirm = () => {
    !isUserAlreadySubscribed &&
      subscribePlayerFetch.executeFetch().then(() => {
        onConfirm();
        (document.getElementById("subscribeModal") as HTMLFormElement).close();
      });
  };

  return (
    <>
      <dialog id="subscribeModal" className="modal">
        <div className="modal-box">
          <div className="flex mb-5 items-center justify-between">
            <h3 className="font-bold text-lg">Inscription au Five</h3>
            {subscribePlayerFetch.error && (
              <Alert message="Error" status="error"></Alert>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="lastName" className="label-text">
                Nom
              </label>
              <input
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFirstName(event.target.value)
                }
                value={firstName}
                name="lastName"
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-fulls"
              />
            </div>

            <Switch
              label="Remplaçant"
              isChecked={isSubstitute || players.length === 10}
              onToggle={() => setIsSubstitute(!isSubstitute)}
            />
          </div>

          <div className="flex w-full gap-2 justify-end mt-6">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost">Annuler</button>
            </form>

            <button
              disabled={firstName.length === 0}
              onClick={() => handleConfirm()}
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
    </>
  );
};
