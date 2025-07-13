"use client";

import React, { useState } from "react";
import clsx from "clsx";

import PrivacyInfoCard from "./PrivacyInfoCard";
import { privacyInfo } from "./constants";

type ActiveTypes =
  | "identityProtection"
  | "dataSecurity"
  | "professionalBoundaries";

export default function PrivacyInfoModal() {
  const [isActive, setIsActive] = useState<ActiveTypes>("identityProtection");

  const getClasses = (key: ActiveTypes) =>
    clsx(
      "relative p-6 mt-6 flex flex-1 cursor-pointer rounded-t-lg overflow-hidden group",
      "transition-colors duration-500 text-center text-lg font-medium min-h-[80px]",
      "max-lg:text-base items-center justify-center",
      "max-md:text-sm max-md:whitespace-normal max-md:p-4",
      "max-[500px]:text-xs",
      isActive === key ? "text-white" : "text-gray-400"
    );

  return (
    <div className="w-full">
      <ul className="flex flex-row items-stretch text-center w-full h-full">
        {privacyInfo.map((info) => {
          return (
            <li
              key={info.key}
              className={getClasses(info.key as ActiveTypes)}
              onClick={() => setIsActive(info.key as ActiveTypes)}
            >
              <BackgroundRisingAnimation
                label={info.label}
                tabKey={info.key}
                isActive={isActive}
              />
            </li>
          );
        })}
      </ul>

      <PrivacyInfoCard isActive={isActive} />
    </div>
  );
}

const BackgroundRisingAnimation = ({
  label,
  tabKey,
  isActive,
}: {
  label: string;
  tabKey: string;
  isActive: string;
}) => {
  const isActiveTab = isActive === tabKey;

  return (
    <>
      <span
        className={clsx(
          "absolute bottom-0 rounded-t-lg left-0 w-full bg-violet-800 z-0 transition-all duration-500",
          isActiveTab ? "h-full" : "h-0 group-hover:h-1/4"
        )}
      />
      <span className="relative z-10">{label}</span>
    </>
  );
};
