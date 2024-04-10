"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SquadMaker from "./SquadMaker";

const TopAppBar: React.FC = () => {
  // 데이터
  const [searchWord, setSearchWord] = useState<string>("");
  const router = useRouter();

  // 액션
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchWord(event.target.value);

  const handleSearch = () => {
    router.push(`/search?name=${searchWord}`);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-2 pl-[116px] pr-[16px] h-[64px] border-b border-border bg-background">
        <div className="absolute left-[16px]">
          <Link
            href={"/"}
            className="relative flex items-center justify-center"
          >
            <h1 className="text-[28px] font-extrabold">DamFC</h1>
          </Link>
        </div>
        <div className="w-full max-w-[1478px] flex items-center justify-end gap-2 shrink">
          <SquadMaker />
          <search className="flex items-center w-full max-w-xs space-x-2">
            <Input
              id="TopAppBarInput"
              type="text"
              placeholder="선수 검색"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
            <Button type="submit" onClick={handleSearch}>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </search>
        </div>
      </header>
      <div className="w-full h-[64px]" />
    </>
  );
};

export default TopAppBar;
