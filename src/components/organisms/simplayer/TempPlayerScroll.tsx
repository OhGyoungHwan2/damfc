// "use client";

// import { TGETPlayer } from "@/app/api/player/[spid]/route";
// import StateLayer from "@/components/atoms/StateLayer";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { usePlayerCompareContext } from "@/context/store";
// import {
//   Dispatch,
//   SetStateAction,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import PlayerCard from "../PlayerCard";
// import { Button } from "@/components/ui/button";
// import { deleteCookies, setCookies } from "@/lib/actions";
// import Select from "@/components/molecules/Select";
// import { Input } from "@/components/ui/input";
// import { status, statusGK } from "@/lib/const";

// type TAllCondition =
//   | keyof TGETPlayer["simPlayers"][0]
//   | "affiliation"
//   | "feature";

// type TCondition = Partial<
//   TGETPlayer["simPlayers"][0] & { affiliation: number; feature: number }
// >;

// type PlayerScrollType = {
//   condition: TCondition;
//   setCondition: Dispatch<SetStateAction<TCondition>>;
// };

// const PlayerScrollContext = createContext<PlayerScrollType>({
//   condition: {},
//   setCondition: () => {},
// });
// const usePlayerScrollContext = () => useContext(PlayerScrollContext);

// export const PlayerScrollProvider: React.FC<{
//   children: React.ReactNode;
//   defaultCondition?: TCondition;
// }> = ({ children, defaultCondition }) => {
//   const [condition, setCondition] = useState<TCondition>(
//     defaultCondition || {}
//   );
//   return (
//     <PlayerScrollContext.Provider
//       value={{
//         condition,
//         setCondition,
//       }}
//     >
//       {children}
//     </PlayerScrollContext.Provider>
//   );
// };

// interface PlayerScrollProps {
//   players: TGETPlayer["simPlayers"];
//   teamcolors: TGETPlayer["teamcolors"];
// }
// export const PlayerScroll: React.FC<PlayerScrollProps> = ({
//   players,
//   teamcolors,
// }) => {
//   // 데이터
//   const { setPlayerLeft, setPlayerRight } = usePlayerCompareContext();
//   const { condition } = usePlayerScrollContext();
//   // 계산
//   // 액션
//   const onClickSetPlayerLeft = (player: TGETPlayer["simPlayers"][0]) =>
//     setPlayerLeft(player);
//   const onClickSetPlayerRight = (player: TGETPlayer["simPlayers"][0]) =>
//     setPlayerRight(player);
//   return (
//     <ScrollArea>
//       <div className="grid grid-flow-col grid-rows-1 gap-4 Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:grid-flow-row Expanded:h-[calc(100vh-100px)] w-max Expanded:w-[360px]">
//         {players.map((player, idx) => (
//           <StateLayer key={player.id} className="bg-foreground">
//             <Dialog>
//               <DialogTrigger className="relative">
//                 <div className="absolute top-0 left-0 text-primary">
//                   {idx + 1}
//                 </div>
//                 <PlayerCard player={player} isBp />
//               </DialogTrigger>
//               <DialogContent className="w-[300px] flex gap-2">
//                 <Button onClick={() => onClickSetPlayerLeft(player)}>
//                   왼쪽교체
//                 </Button>
//                 <Button onClick={() => onClickSetPlayerRight(player)}>
//                   오른쪽교체
//                 </Button>
//               </DialogContent>
//             </Dialog>
//           </StateLayer>
//         ))}
//       </div>
//       <ScrollBar orientation="horizontal" />
//     </ScrollArea>
//   );
// };

// export const PlayerScrollSelect: React.FC<{
//   selectItems: { value: string; node: React.ReactNode }[];
//   type: TAllCondition;
// }> = ({ selectItems, type }) => {
//   const { setCondition } = usePlayerScrollContext();
//   const onSelctCallback = (value: string) =>
//     setCondition((pre) => ({ ...pre, [type]: value.toUpperCase() }));
//   return (
//     <Select
//       defaultValue=""
//       selectItems={selectItems}
//       onSelctCallback={onSelctCallback}
//     />
//   );
// };

// export const PlayerScrollStatus: React.FC = () => {
//   const [statusKey, setStatusKey] = useState("");
//   const [statusMin, setStatusMin] = useState("");
//   const [statusMax, setStatusMax] = useState("");
//   const { setCondition } = usePlayerScrollContext();
//   const onSelctCallback = () =>
//     setCondition((pre) => ({
//       ...pre,
//       [statusKey]: { min: parseInt(statusMin), max: parseInt(statusMax) },
//     }));
//   const selectItems = Object.entries({ ...status, ...statusGK }).map(
//     ([key, value]) => ({
//       value: value,
//       node: <div key={key}>{value}</div>,
//     })
//   );

//   return (
//     <div className="flex">
//       <Select
//         defaultValue=""
//         selectItems={selectItems}
//         onSelctCallback={setStatusKey}
//       />
//       <Input
//         type="text"
//         maxLength={3}
//         placeholder="최소"
//         onChange={(e) => setStatusMin(e.target.value)}
//       />
//       <Input
//         type="text"
//         maxLength={3}
//         placeholder="최대"
//         onChange={(e) => setStatusMax(e.target.value)}
//       />
//       <Button onClick={onSelctCallback}>적용</Button>
//     </div>
//   );
// };

// export const PlayerScrollFilterReset: React.FC = () => {
//   const { setCondition } = usePlayerScrollContext();
//   const onClickButton = () => (
//     setCondition(Object.assign({})),
//     deleteCookies("condition"),
//     alert("초기화 완료")
//   );
//   return (
//     <Button onClick={onClickButton} className="w-[50px]">
//       초기화
//     </Button>
//   );
// };

// export const PlayerScrollFilterFix: React.FC = () => {
//   const { condition } = usePlayerScrollContext();
//   const onClickButton = () => (
//     setCookies("condition", condition), alert("고정 완료")
//   );
//   return (
//     <Button onClick={onClickButton} className="w-[50px]">
//       고정
//     </Button>
//   );
// };
