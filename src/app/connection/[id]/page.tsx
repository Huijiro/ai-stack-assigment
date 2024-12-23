"use client";
import Root from "@/components/resource/Root";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIndexStore } from "@/context/IndexContext";

export default function Page() {
  const { IDs } = useIndexStore();
  return (
    <main className="h-screen flex py-10 justify-center">
      <div className="flex flex-col gap-4 h-full p-8">
        <ScrollArea className="h-3/4">
          <Root />
        </ScrollArea>
        <Button
          onClick={() => {
            console.log(IDs);
          }}
        >
          Index
        </Button>
      </div>
    </main>
  );
}
