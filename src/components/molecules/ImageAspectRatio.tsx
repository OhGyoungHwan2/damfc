import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageAspectRatioProps {
  width: number | string;
  imgSrc: string;
  alt: string;
  className?: string;
}

const ImageAspectRatio: React.FC<ImageAspectRatioProps> = ({
  width,
  imgSrc,
  alt,
  className = "",
}) => {
  return (
    <div className="relative flex-shrink-0" style={{ width: width }}>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={`${imgSrc}?raw=true`}
        className={cn("w-full h-auto", className)}
        alt={alt}
        placeholder={"empty"}
      />
    </div>
  );
};

export default ImageAspectRatio;
