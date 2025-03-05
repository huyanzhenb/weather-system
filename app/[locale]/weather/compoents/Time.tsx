"use client";
import { useState, useEffect } from "react";

export default function Time() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 更新时间的函数
  const updateTime = () => {
    const now = new Date();
    // 获取年月日
    const date = now.toISOString().split("T")[0];
    // 获取时间（24小时制）
    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });
    // 合并日期和时间
    setCurrentTime(`${date} ${time}`);
  };

  // 使用 useEffect 设置定时器和加载状态
  useEffect(() => {
    // 模拟加载延迟
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // 每秒更新时间
    const timer = setInterval(updateTime, 1000);

    // 清理定时器
    return () => {
      clearTimeout(loadTimer);
      clearInterval(timer);
    };
  }, []);

  // 骨架屏
  if (isLoading) {
    return (
      <div className="w-42 h-[20px] bg-[#393b3f] animate-pulse rounded-xl"></div>
    );
  }

  // 渲染时间
  return (
    <div className="text-[16px] text-[rgba(255,255,255,0.55)]">
      {currentTime || "0000-00-00 00:00:00"}
    </div>
  );
}