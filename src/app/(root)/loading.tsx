import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-y-3">
        <Loader2Icon className="size-7 animate-spin dark:text-white" />
        <h1 className="text-2xl dark:text-white">Loading...</h1>
      </div>
    </div>
  );
}
