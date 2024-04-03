import { Separator } from "@/components/ui/separator";
const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center w-full gap-2 px-[16px] py-10 mt-20 border-t border-border">
      <div className="flex flex-col">
        <h4 className="flex flex-col">
          DamFC
          <span className="text-xs text-muted-foreground">
            #유사도분석 #선수추천 #랭커추천 #스쿼드 #선수검색 #최고의선수
          </span>
        </h4>
        <p className="text-xs text-muted-foreground">
          유사도 분석을 통해 최고의 선수를 추천해주는 사이트입니다. 랭커들이
          많이 사용하는 선수, 랭커가 사용하는 선수와 스쿼드를 분석해 최고의
          선수를 추천해줍니다.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="p-2 text-xs rounded-md bg-muted text-muted-foreground">
            문의 okh5317797@gmail.com
          </div>
          <div className="p-2 text-xs rounded-md bg-muted text-muted-foreground">
            DamFC에 표시된 모든 브랜드, 상표는 제3자의 소유이며 DamFC에선 정보
            제공의 목적으로만 사용되며, 수집되는 정보는 오직 누구나 자유로이
            접근이 가능한 데이터만을 수집합니다.
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <div className="flex flex-row flex-wrap items-center text-xs text-muted-foreground">
        <div className="gap-2 text-xs border rounded-md text border-border text-foreground">
          오픈소스
        </div>
        {[
          "React",
          "Next.js",
          "Vercel",
          "nivo/chart",
          "shadcn/ui",
          "Prisma",
        ].map((key) => (
          <div
            key={key}
            className="px-2 py-1 text-xs border rounded-md text border-border text-muted-foreground"
          >
            {key}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
