"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

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
  const [currentImgSrc, setCurrentImgSrc] = useState(imgSrc);
  const onErrorImage = () => {
    if (imgSrc.includes("player")) {
      setCurrentImgSrc(
        "https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/not_found.AVIF?raw=true"
      );
    }
  };
  return (
    <div className="relative flex-shrink-0" style={{ width: width }}>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={`${currentImgSrc}`}
        className={cn("w-full h-auto", className)}
        alt={alt}
        placeholder={"empty"}
        onError={() => onErrorImage()}
      />
    </div>
  );
};

export default ImageAspectRatio;
