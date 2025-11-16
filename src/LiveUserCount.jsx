import React, { useState, useEffect } from "react";

const LiveUserCount = () => {
  const [userCount, setUserCount] = useState(120); // initial count

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prevCount) => {
        // Random increase or decrease
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(0, prevCount + change);
      });
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        👥 Live User Count
      </h1>
      <div className="text-6xl font-extrabold text-blue-600">
        {userCount}
      </div>
      <p className="mt-2 text-gray-500">users online right now</p>
    </div>
  );
};

export default LiveUserCount;
