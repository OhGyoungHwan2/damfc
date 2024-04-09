import { cn } from "@/lib/utils";

const AreaOptions = [
  {
    basis: "basis-[28%]",
    positionOptions: [
      { spPositions: [27], basis: ["basis-[100%]"] },
      { spPositions: [26, 22], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [25, 21], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [24, 20], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [23], basis: ["basis-[100%]"] },
    ],
  },
  {
    basis: "basis-[28%]",
    positionOptions: [
      { spPositions: [16], basis: ["basis-[100%]"] },
      { spPositions: [19, 15], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [18, 14], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [17, 13], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [12], basis: ["basis-[100%]"] },
    ],
  },
  {
    basis: "basis-[34%]",
    positionOptions: [
      { spPositions: [8, 7], basis: ["basis-[50%]", "basis-[50%]"] },
      { spPositions: [11, 6], basis: ["basis-[40%]", "basis-[60%]"] },
      {
        spPositions: [10, 5, 1],
        basis: ["basis-[40%]", "basis-[30%]", "basis-[30%]"],
      },
      { spPositions: [9, 4], basis: ["basis-[40%]", "basis-[60%]"] },
      { spPositions: [2, 3], basis: ["basis-[50%]", "basis-[50%]"] },
    ],
  },
  {
    basis: "basis-[10%]",
    positionOptions: [
      { spPositions: [], basis: [] },
      { spPositions: [], basis: [] },
      { spPositions: [0], basis: ["basis-[100%]"] },
      { spPositions: [], basis: [] },
      { spPositions: [], basis: [] },
    ],
  },
];

const StadiumArea: React.FC<{ basis: string; children: React.ReactNode[] }> = ({
  basis,
  children,
}) => {
  return (
    <div className={cn("grid grid-cols-5 relative", basis)}>
      {children.map((_, idx) => (
        <div key={`StadiumAreaDiv${idx}`} className="flex flex-col">
          {children[idx]}
        </div>
      ))}
    </div>
  );
};

const StadiumLine: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col -z-10">
      <div className="relative overflow-hidden size-full">
        {/* 가운데 원 */}
        <div className="absolute h-[20%] aspect-square -translate-x-1/2 -translate-y-1/2 top-0 left-1/2 rounded-b-full border-[2px] border-foreground" />
        {/* 아래골대 */}
        <div className="absolute bottom-0 h-[14%] w-[50%] border-x-2 border-t-2 border-foreground left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

const PositionArea: React.FC<{
  basis: string;
  children: React.ReactNode;
}> = ({ basis, children }) => {
  return (
    <div className={cn("relative", basis)}>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:z-20">
        {children}
      </div>
    </div>
  );
};

interface IStadium {
  positionItems: Record<number, React.ReactNode>;
}

const Stadium: React.FC<IStadium> = ({ positionItems }) => {
  return (
    <div className="h-full px-[16px] relative mx-auto aspect-[2/3] Medium:aspect-[3/2] flex flex-col border-2 border-foreground max-h-[calc(100vh-180px)]">
      {AreaOptions.map((areaOption, idx) => (
        <StadiumArea key={`StadiumArea${idx}`} basis={areaOption.basis}>
          {areaOption.positionOptions.map((positionOption) =>
            positionOption.spPositions.map((spPosition, idx) => (
              <PositionArea
                key={`StadiumPositionArea${spPosition}`}
                basis={positionOption.basis[idx]}
              >
                {positionItems[spPosition]}
              </PositionArea>
            ))
          )}
        </StadiumArea>
      ))}
      <StadiumLine />
    </div>
  );
};
export default Stadium;
