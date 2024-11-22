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
  const [isError,setIsError] = useState(false)
  return (
    <div className="relative flex-shrink-0" style={{ width: width }}>
      {isError ? <div className={cn("w-full h-auto", className)} /> :<Image
        width={0}
        height={0}
        sizes="100vw"
        src={`${imgSrc}`}
        className={cn("w-full h-auto", className)}
        alt={alt}
        placeholder={"empty"}
        onError={(e)=>{
          console.log(e)
          setIsError(true)
        }} />
  }
    </div>
  );
};

export default ImageAspectRatio;
