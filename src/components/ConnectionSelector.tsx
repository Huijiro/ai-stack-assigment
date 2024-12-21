"use client";
import { Connection } from "@/app/api/connection/route";

type Props = {
  connections: Connection[];
};

export function ConnectionSelector({ connections }: Props) {
  return (
    <nav>
      {connections.map((connection) => (
        <a
          key={connection.connection_id}
          href={`/connection/${connection.connection_id}`}
        >
          {connection.name}
        </a>
      ))}
    </nav>
  );
}
