import { useUser } from "@clerk/clerk-react";
import { startCase } from "lodash";
import { ChangeEvent, FC, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { Players, PlayersResponse } from "../../models/Players";
import { supabase } from "../../supabase";
import { closeModal } from "../../utils/ShowModal";
import { Alert } from "../Alert/Alert";
import { Switch } from "../Switch/Switch";
import { Fives } from "../../models/Fives";

export interface SubscribeModalProps {
  onConfirm: () => void;
  five: Fives;
  playerInfo: Players;
}

export const SubscribeModal: FC<SubscribeModalProps> = ({
  onConfirm,
  five,
  playerInfo,
}) => {
  const { user } = useUser();
  const [isSubstitute, setIsSubstitute] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(playerInfo?.userName ?? "");

  const subscribePlayerFetch = useSupabase<PlayersResponse[]>(
    () =>
      supabase.from("players").insert({
        user_id: user?.id,
        user_name: userName,
        first_name: user?.firstName,
        last_name: user?.lastName,
        user_img: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    false
  );

  const handleConfirm = async () => {
    if (!playerInfo) {
      await subscribePlayerFetch.executeFetch();
    }

    const isPlayerAlreadySubscribed = five.players.find(
      (player) => player.userId === playerInfo.userId
    );

    !isPlayerAlreadySubscribed &&
      (await supabase.from("five_players").insert({
        five_id: five.id,
        player_id: user?.id,
        is_substitute: isSubstitute,
        player_name: userName,
      }));

    !isPlayerAlreadySubscribed &&
      (await supabase
        .from("players")
        .update({
          user_name: userName,
        })
        .eq("user_id", user?.id));

    onConfirm();
    closeModal("subscribeModal");
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
                  setUserName(event.target.value)
                }
                value={startCase(userName)}
                name="lastName"
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-fulls"
              />
            </div>

            <Switch
              label="Remplaçant"
              isChecked={isSubstitute || (five?.players ?? [])?.length === 10}
              onToggle={() => setIsSubstitute(!isSubstitute)}
            />
          </div>

          <div className="flex w-full gap-2 justify-end mt-6">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost">Annuler</button>
            </form>

            <button
              disabled={userName.length === 0}
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
