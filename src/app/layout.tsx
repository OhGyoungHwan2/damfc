import "./globals.css";
import "lazysizes";
import TopAppBar from "../components/organisms/TopAppBar";
import { ThemeProvider } from "@/lib/provider/theme-provider";
import { SquadProvider } from "@/context/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={"font-['Pretendard-Regular']"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SquadProvider>
            <TopAppBar />
            <main className="w-full max-w-[1478px] mx-auto min-h-[calc(100dvh-64px)] flex flex-col gap-[16px] Expanded:gap-[24px] Large:gap-[48px] ExtraLarge:gap-[64px]">
              {children}
            </main>
          </SquadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
