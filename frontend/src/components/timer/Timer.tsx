import React, { useState } from "react";
import Result from "components/questions/result/Result";
import { useNavigate } from "react-router";
import { useTimer } from "react-timer-hook";
import Timer from "storage/timer";
import { useAppDispatch } from "hooks/redux/main";

function MyTimer({
  expiryTimestamp,
  expireTime,
}: {
  expiryTimestamp: any;
  expireTime: () => void;
}) {
  const [isExpire, setIsExpire] = useState(false);
  const { totalSeconds, seconds, minutes, hours, days, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        expireTime();
      },
    });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  );
}
export default MyTimer;
