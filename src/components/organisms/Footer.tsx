"use client";
import Link from "next/link";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { Button } from "../ui/button";

const OPEN_SOURCE = [
  { name: "React", url: "https://react.dev/" },
  { name: "NextJs", url: "https://nextjs.org/" },
  { name: "Vercel", url: "https://vercel.com/" },
  { name: "Nivo", url: "https://nivo.rocks/" },
  { name: "Shadcn/UI", url: "https://ui.shadcn.com/" },
  { name: "Prisma", url: "https://www.prisma.io/" },
  { name: "MongoDB Atlas", url: "https://www.mongodb.com/atlas/database" },
];

const CLASSNAME_OPEN_SOURCE =
  "rounded-md bg-card border border-border py-0.5 px-1";

const Footer: React.FC = () => {
  const onClickMail = () =>
    navigator.clipboard.writeText("okh5317797@gmail.com");
  return (
    <footer className="w-full max-w-[1478px] mx-auto mt-52 border-t border-border text-sm p-10">
      {/* 사이트 정보 */}
      <div className="flex gap-10 flex-col Medium:flex-row">
        <div className="flex flex-col gap-2">
          <p className="border-b border-foreground">프로젝트</p>
          <div className="flex gap-2">
            <ImageAspectRatio width={40} imgSrc="/logo.png" alt="DamFC로고" />
            <div className="flex flex-col gap-1">
              <span>DamFC</span>
              <span className="text-muted-foreground text-nowrap">
                fconline.player recommend
              </span>
            </div>
          </div>
          <div className="text-muted-foreground">© 2024, DamFC</div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="border-b border-foreground">MongoDB / Vercel</p>
          <span>마지막 업데이트: 2024.06.12</span>
          <span className="text-muted-foreground">
            데이터는 1주 단위로 업데이트 됩니다.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="border-b border-foreground">디자인/개발/운영</p>
          <span>오경환</span>
          <div className="size-[40px] rounded-md hover:bg-[#5865F2] p-1">
            <Link
              href={`https://link.fmkorea.org/link.php?url=https%3A%2F%2Fdiscord.gg%2FpkBQTbay4r&lnu=1056853558&mykey=MDAwMTM3MTE0ODgzODA=`}
              target="_blank"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Discord</title>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </Link>
          </div>
          <Button variant="secondary" onClick={onClickMail}>
            <span>okh5317797@gmail.com</span>
          </Button>
        </div>
      </div>
      {/* 권한, 오픈소스 정보 */}
      <div className="flex flex-col text-muted-foreground text-xs gap-1 py-2">
        <p className="border-b border-foreground">
          수집, 사용권한, 오픈소스 라이센스
        </p>
        <span>
          DamFC에 표시된 모든 브랜드, 상표, 이미지는 제3자의 소유이며 DamFC에선
          정보 제공의 목적으로만 사용되며, 수집되는 정보는 오직 누구나 자유로이
          접근이 가능한 데이터만을 수집합니다.
        </span>
        <span>
          사이트에 포함된 FC온라인과 관련된 모든 자료는 EA Sports 및 NEXON의
          재산 및 등록 상표입니다. 저작권 침해 의도가 없습니다.
        </span>
        <div className="flex gap-1 text-foreground text-sm items-center flex-wrap">
          <span className="text-nowrap">오픈소스</span>
          {OPEN_SOURCE.map(({ name, url }) => (
            <Link
              href={url}
              key={name}
              target="_blank"
              className={CLASSNAME_OPEN_SOURCE}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
