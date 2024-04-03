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
    return "";
  };

  const bgTextColor = getBgTextColor(enhance);

  return (
    <small className={cn("font-extrabold", bgTextColor, className)}>
      {enhance}
    </small>
  );
};
export default Enhancement;
