"use client";
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
        src={`${imgSrc}`}
        className={cn("w-full h-auto", className)}
        alt={alt}
        placeholder={"empty"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/not_found.AVIF?raw=true";
        }}
      />
    </div>
  );
};

export default ImageAspectRatio;
