import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import textTools from "../../assets/intermission/text-icons.png";
import {
  ChatDocumentMessage,
  useChatDocumentMessages,
} from "../../hooks/useChatDocumentMessages";

export type TextDocumentWidgetProps = {
  isEn?: boolean;
  className?: string;
};

const randomIntInclusive = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getMessagesString = (messages: ChatDocumentMessage[] | undefined) => {
  if (!messages) return "";
  return [...messages]
    .reverse()
    .map((message) => message.message)
    .join(" ");
};

export const TextDocumentWidget = ({
  isEn,
  className,
}: TextDocumentWidgetProps) => {
  const [skipAnimation, setSkipAnimation] = useState(true);
  const [documentText, setDocumentText] = useState("");
  const [visibleDocumentText, setVisibleDocumentText] = useState("");
  const animationIntervalId = useRef<ReturnType<typeof setInterval>>();

  const { data: messages, refetch: refetchMessages } =
    useChatDocumentMessages();

  useEffect(() => {
    const id = setInterval(() => {
      setSkipAnimation(false);
      void refetchMessages();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [refetchMessages]);

  useEffect(() => {
    setDocumentText(getMessagesString(messages));
  }, [messages]);

  useEffect(() => {
    if (skipAnimation || visibleDocumentText.length >= documentText.length) {
      setVisibleDocumentText(documentText);
      return;
    }

    animationIntervalId.current = setInterval(
      () => {
        setVisibleDocumentText((prev) => {
          const nextChar = documentText[prev.length];
          if (nextChar) return prev + nextChar;
          else return prev;
        });
      },
      randomIntInclusive(50, 180)
    );

    return () => {
      clearInterval(animationIntervalId.current);
    };
  }, [visibleDocumentText, documentText, skipAnimation]);

  const helperText = isEn
    ? "Use !txt in chat to write your message!"
    : "Schreibe deine Nachricht mit !txt im Chat!";

  return (
    <div className={cn("flex flex-col items-start h-full", className)}>
      <img src={textTools} alt="" />
      <div className="mt-2 flex flex-col overflow-hidden w-full">
        <div className="text-[#d7d4ff] border-y-[3px] border-[#d7d4ff] pt-2 pb-1.5 mb-4 text-center">
          {helperText}
        </div>
        <div className="max-w-[488px] custom-text-shadow-dark text-[#d7d4ff] text-base/7 overflow-hidden flex flex-col-reverse pb-3">
          <div>
            <span>{visibleDocumentText}</span>
            <span className="inline-flex pl-0.5">
              <span className="animate-blink h-5 translate-y-0.5 shadow-int-highlight-dark shadow-[3px_3px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
