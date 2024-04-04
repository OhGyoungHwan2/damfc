import { cn } from "@/lib/utils";

interface StateLayerProps {
  className: string;
  children: React.ReactNode;
}

const StateLayer: React.FC<StateLayerProps> = ({
  className = "",
  children,
}) => {
  return (
    <div className="relative">
      {children}
      <div
        className={cn(
          "inset-0 absolute opacity-0 hover:opacity-[8%] focus:opacity-[10%] pointer-events-none",
          className
        )}
      />
    </div>
  );
};
export default StateLayer;
