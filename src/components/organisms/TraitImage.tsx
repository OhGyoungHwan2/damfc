import { traitKey2kr } from "@/lib/const";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TraitImageProps {
  traitKey: keyof typeof traitKey2kr;
}

const TraitImage: React.FC<TraitImageProps> = ({ traitKey }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <ImageAspectRatio
            imgSrc={`/trait/trait_icon_${traitKey
              .replace("trait", "")
              .padStart(2, "0")}.png`}
            width={18}
            alt={`${traitKey}이미지`}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-background">
          <p className="text-foreground">{traitKey2kr[traitKey]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TraitImage;
