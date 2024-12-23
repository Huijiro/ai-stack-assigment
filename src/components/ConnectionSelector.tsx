"use client";
import { Connection } from "@/app/api/connection/route";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  connections: Connection[];
};

export function ConnectionSelector({ connections }: Props) {
  return (
    <nav className="flex flex-wrap justify-center gap-2">
      {connections.map((connection) => (
        <a
          key={connection.connection_id}
          href={`/connection/${connection.connection_id}`}
        >
          <Button variant="outline" size="icon" className="h-24 w-24">
            <span className="sr-only">Open {connection.name}</span>
            <Image
              width={24}
              height={24}
              className="dark:invert h-24 w-24"
              src={`/icons/${connection.connection_provider}.svg`}
              alt={`Icon for ${connection.name}`}
            />
          </Button>
        </a>
      ))}
    </nav>
  );
}
