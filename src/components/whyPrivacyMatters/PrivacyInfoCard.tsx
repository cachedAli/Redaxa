import React from "react";
import clsx from "clsx";

import { privacyInfo } from "./constants";

export default function PrivacyInfoCard({ isActive }: { isActive: string }) {
  return (
    <div className="h-full bg-gradient-to-b from-violet-800 to-blue-800">
      {privacyInfo.map((info) => {
        const isActiveTab = isActive === info.key;

        if (!isActiveTab) return null;
        return (
          <div
            key={info.key}
            className={clsx(
              "flex py-14 gap-8 items-center justify-center",
              "max-lg:flex-col max-lg:px-28",
              "max-sm:px-12"
            )}
          >
            <>
              <div
                className={clsx(
                  "w-full md:w-1/2 max-w-[400px] flex justify-center",
                  "max-lg:w-full"
                )}
              >
                {info.illustration && <info.illustration />}
              </div>

              <div
                className={clsx(
                  "flex flex-col w-2/5 gap-5 text-white text-center",
                  "max-lg:w-full"
                )}
              >
                <h2 className="text-2xl font-semibold">{info.heading}</h2>
                <p className="text-lg leading-8">{info.description}</p>
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
}
