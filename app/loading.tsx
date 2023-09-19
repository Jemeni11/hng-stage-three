import React from "react";

function Loading() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-[50%] border-[0.625rem] border-solid border-white border-t-[#0fa968]"></div>
      <p className="text-2xl font-black text-textColor">Loading</p>
    </div>
  );
}

export default Loading;
