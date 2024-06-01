import { MapPinIcon } from "@heroicons/react/20/solid";

export default function DanteAndPlace() {
  return (
    <div className="flex flex-col">
      <span className="text-secondary">Date et Lieu</span>

      <div className="flex items-center">
        <h2 className="font-bold">Mardi 4 Juin - Tremblay </h2>

        <MapPinIcon
          onClick={() =>
            window.open("https://maps.app.goo.gl/dLz7kVagb1Ep89vK8")
          }
          className="size-5 ms-1"
        />
      </div>
      <div className="divider my-2" />
    </div>
  );
}
