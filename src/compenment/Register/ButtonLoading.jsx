import React from 'react';
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button disabled className="flex items-center justify-center w-full rounded-md bg-amber-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
Veuillez patienter
    </Button>
  );
}
