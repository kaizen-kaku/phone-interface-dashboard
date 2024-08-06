"use client"
import { Button } from "@/components/Button";
import { cx, focusRing } from "@/lib/utils";
import { RiMore2Fill } from "@remixicon/react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DropdownUserProfile } from "./DropdownUserProfile";

const useLoadingSimulation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};

const UserInitials = ({ name, isLoading, className }: any) => (
  <span
    className={cx(
      "flex shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300",
      isLoading ? "blur-sm" : "",
      className
    )}
    aria-hidden="true"
  >
    {name.split(' ').map((word: string) => word[0].toUpperCase()).slice(0, 2).join('')}
  </span>
);

export const UserProfileDesktop = () => {
  const { data: sessionData } = useSession();
  const isLoading = useLoadingSimulation();
  const name = sessionData?.user?.name ?? 'User';

  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          "group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        <span className="flex items-center gap-3">
          <UserInitials name={name} isLoading={isLoading} className="size-8" />
          <span className={isLoading ? "blur-sm" : ""}>{name}</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  );
}

export const UserProfileMobile = () => {
  const { data: sessionData } = useSession();
  const isLoading = useLoadingSimulation();
  const name = sessionData?.user?.name ?? 'User';

  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        <UserInitials name={name} isLoading={isLoading} className="size-7" />
      </Button>
    </DropdownUserProfile>
  );
}