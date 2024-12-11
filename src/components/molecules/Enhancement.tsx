import { cn } from "@/lib/utils";

interface EnhancementProps {
  enhance: number;
  className?: string;
}

const Enhancement: React.FC<EnhancementProps> = ({
  enhance,
  className = "",
}) => {
  const getBgTextColor = (enhance: number): string => {
    if (enhance <= 1) return "bg-[#42464d] text-[#c5c8c9]";
    if (enhance <= 4) return "bg-[#ad5f42] text-[#7e3f27]";
    if (enhance <= 7) return "bg-[#b8bdca] text-[#4e545e]";
    if (enhance <= 10) return "bg-[#dca908] text-[#695100]";
    if (enhance <= 13) return "bg-gradient-to-r from-red-600 from-3% via-neutral-50 via-50% to-sky-600 to-97% text-[#4e545e]";
    return "";
  };

  const bgTextColor = getBgTextColor(enhance);

  return (
    <div
      className={cn(
        "font-extrabold text-center flex items-center justify-center",
        bgTextColor,
        className
      )}
    >
      <small>{enhance}</small>
    </div>
  );
};
export default Enhancement;
