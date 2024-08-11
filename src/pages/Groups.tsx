import { Groups as GroupsComponent } from "../components/Groups/Groups";
import { Groups as GroupsModel } from "../models/Groups";

export default function Groups() {
  return (
    <h1>
      <GroupsComponent
        groups={[]}
        onGroupClick={function (group: GroupsModel): void {
          throw new Error("Function not implemented.");
        }}
      />
    </h1>
  );
}
