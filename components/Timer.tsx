import React from "react";
import { useTimer } from "react-timer-hook";

export const MyTimer = ({ expiryTimestamp }: any) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="flex justify-center items-center rounded-full px-4 py-2">
      <div className="text-3xl font-sans font-bold text-indigo-500">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
};
