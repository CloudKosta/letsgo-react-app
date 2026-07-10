import { useCallback, useEffect, useRef, useState } from "react";
import {
  getChatLogs,
  getSessionId,
  resetSessionId,
  sendChat,
  type ChatLog,
} from "../../../api/chatbotApi";

export interface Bubble {
  key: string;
  role: "user" | "bot";
  text: string;
}

function toBubbles(log: ChatLog): Bubble[] {
  return [
    { key: `${log.id}-u`, role: "user", text: log.user_message },
    { key: `${log.id}-b`, role: "bot", text: log.bot_response },
  ];
}

export function useChatBot() {
  const sessionRef = useRef(getSessionId());
  const sendingRef = useRef(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    getChatLogs(sessionRef.current)
      .then(({ logs }) => {
        if (!ignore) setBubbles(logs.flatMap(toBubbles));
      })
      .catch(() => {
        if (!ignore) setError("대화 이력을 불러오지 못했습니다.");
      });
    return () => {
      ignore = true;
    };
  }, []);

  const send = useCallback(async (message: string) => {
    const text = message.trim();
    if (!text || sendingRef.current) return;

    sendingRef.current = true;
    setError(null);
    setSending(true);
    setBubbles((prev) => [...prev, { key: `tmp-${Date.now()}`, role: "user", text }]);
    try {
      const log = await sendChat(sessionRef.current, text);
      setBubbles((prev) => [...prev.slice(0, -1), ...toBubbles(log)]);
    } catch {
      setError("메시지 전송에 실패했습니다.");
      setBubbles((prev) => prev.slice(0, -1));
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }, []);

  const clear = useCallback(() => {
    sessionRef.current = resetSessionId();
    setBubbles([]);
    setError(null);
  }, []);

  return { bubbles, sending, error, send, clear };
}
