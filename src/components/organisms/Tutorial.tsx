"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TriangleUpIcon,
  TriangleDownIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from "@radix-ui/react-icons";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { setCookies } from "@/lib/actions";

const TutorialContext = createContext<{
  stage: number;
  maxStage: number;
  setStage: Dispatch<SetStateAction<number>>;
}>({
  stage: 0,
  maxStage: 0,
  setStage: () => {},
});

const useTutorialContext = () => useContext(TutorialContext);

export const Tutorial_Provider: React.FC<{
  children: React.ReactNode;
  isVisit: boolean;
  maxStage: number;
}> = ({ children, isVisit, maxStage }) => {
  const [stage, setStage] = useState(isVisit ? 0 : 1);
  useEffect(() => {
    setCookies("isVisit", {});
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        stage,
        setStage,
        maxStage,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

type TDirection = "top" | "bottom" | "left" | "right";

export const Tutorial_Tooltip: React.FC<{
  explanation: string;
  stageIndex: number;
  direction: TDirection;
  expandedDirection?: TDirection;
}> = ({ explanation, stageIndex, direction, expandedDirection }) => {
  // 데이터
  const { stage, setStage, maxStage } = useTutorialContext();

  // 계산
  const direction2AlertClassName = (key: TDirection) => {
    switch (key) {
      case "bottom":
        return "top-0 -translate-y-full left-1/2 -translate-x-1/2";
      case "top":
        return "bottom-0 translate-y-full left-1/2 -translate-x-1/2";
      case "right":
        return "left-0 -translate-x-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-0 translate-x-full top-1/2 -translate-y-1/2";
      default:
        return "";
    }
  };
  const expandedDirection2AlertClassName = (key: TDirection) => {
    switch (key) {
      case "bottom":
        return "Expanded:top-0 Expanded:-translate-y-full Expanded:left-1/2 Expanded:-translate-x-1/2";
      case "top":
        return "Expanded:bottom-0 Expanded:translate-y-full Expanded:left-1/2 Expanded:-translate-x-1/2";
      case "right":
        return "Expanded:left-0 Expanded:-translate-x-full Expanded:top-1/2 Expanded:-translate-y-1/2";
      case "left":
        return "Expanded:right-0 Expanded:translate-x-full Expanded:top-1/2 Expanded:-translate-y-1/2";
      default:
        return "";
    }
  };
  const direction2TriangleIcon = (key: TDirection) => {
    switch (key) {
      case "bottom":
        return (
          <TriangleDownIcon
            key={key}
            className={cn(
              "size-[36px] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 text-foreground",
              expandedDirection && "Expanded:hidden"
            )}
          />
        );
      case "top":
        return (
          <TriangleUpIcon
            key={key}
            className={cn(
              "size-[36px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 text-foreground",
              expandedDirection && "Expanded:hidden"
            )}
          />
        );
      case "right":
        return (
          <TriangleRightIcon
            key={key}
            className={cn(
              "size-[36px] absolute top-1/2 right-0 translate-x-3/4 -translate-y-1/2 text-foreground",
              expandedDirection && "Expanded:hidden"
            )}
          />
        );
      case "left":
        return (
          <TriangleLeftIcon
            key={key}
            className={cn(
              "size-[36px] absolute top-1/2 left-0 -translate-x-3/4 -translate-y-1/2 text-foreground",
              expandedDirection && "Expanded:hidden"
            )}
          />
        );
      default:
        return <></>;
    }
  };

  const expandedDirection2TriangleIcon = (key: TDirection) => {
    switch (key) {
      case "bottom":
        return (
          <TriangleDownIcon
            key={key}
            className="size-[36px] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 text-foreground hidden Expanded:block"
          />
        );
      case "top":
        return (
          <TriangleUpIcon
            key={key}
            className="size-[36px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3/4 text-foreground hidden Expanded:block"
          />
        );
      case "right":
        return (
          <TriangleRightIcon
            key={key}
            className="size-[36px] absolute top-1/2 right-0 translate-x-full -translate-y-1/2 text-foreground hidden Expanded:block"
          />
        );
      case "left":
        return (
          <TriangleLeftIcon
            key={key}
            className="size-[36px] absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 text-foreground hidden Expanded:block"
          />
        );
      default:
        return <></>;
    }
  };
  // 액션
  const onClickPre = () => setStage((pre) => (pre - 1 > 0 ? pre - 1 : 0));
  const onClickNext = () =>
    setStage((pre) => (pre + 1 > maxStage ? 0 : pre + 1));
  return (
    stageIndex === stage && (
      <Alert
        className={cn(
          "absolute z-40 w-[300px] bg-foreground text-background left-1/2 -translate-x-1/2",
          direction2AlertClassName(direction),
          expandedDirection &&
            expandedDirection2AlertClassName(expandedDirection)
        )}
      >
        <AlertDescription className="relative">
          {direction2TriangleIcon(direction)}
          {expandedDirection &&
            expandedDirection2TriangleIcon(expandedDirection)}
          <span className="break-keep">{explanation}</span>
          <div className="flex justify-end gap-0.5">
            <Button
              variant="secondary"
              disabled={stage == 1}
              onClick={() => onClickPre()}
            >
              {"이전"}
            </Button>
            <Button
              variant={stage == maxStage ? "default" : "secondary"}
              onClick={() => onClickNext()}
            >
              {stage == maxStage ? "끝" : "다음"}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  );
};
