"use client";

import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { usePlayerCompareContext } from "@/context/store";
import PlayerAddSelect from "../PlayerAddSelect";

interface AddSelectProps {
  teamcolors: TGETPlayer["teamcolors"];
  type: "left" | "right";
}
export const AddSelect: React.FC<AddSelectProps> = ({ teamcolors, type }) => {
  // 데이터
  const { playerLeft, playerRight, setLeftAddStatus, setRightAddStatus } =
    usePlayerCompareContext();
  const player = type === "left" ? playerLeft : playerRight;
  const setAddStatus = type === "left" ? setLeftAddStatus : setRightAddStatus;
  return (
    <PlayerAddSelect
      player={player}
      teamcolors={teamcolors}
      setSelectAddStatus={setAddStatus}
    />
  );
};
