import { MapPinIcon } from "@heroicons/react/20/solid";
import { useGlobalStore } from "../../context/store";
import { formatDate } from "../../utils/FormatDate";

export default function DateAndPlace() {
  const { five } = useGlobalStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex flex-col">
          <h2 className="font-bold">{formatDate(five?.date ?? "")}</h2>

          <h2 className="text-secondary flex text-sm">
            {five?.place}
            <MapPinIcon
              onClick={() =>
                window.open(five?.placeUrl, 'noopener')
              }
              className="size-5 ms-1"
            />
          </h2>
        </div>
      </div>
      <div className="divider my-2" />
    </div>
  );
}
