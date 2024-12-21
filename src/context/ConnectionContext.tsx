import { Connection } from "@/app/api/connection/route";
import React from "react";

interface ConnectionContextType {
  selectedConnection: Connection | null;
  setSelectedConnection: (connection: Connection | null) => void;
  connections: Connection[];
  setConnections: (connections: Connection[]) => void;
}

export const ConnectionContext = React.createContext<ConnectionContextType>({
  selectedConnection: null,
  setSelectedConnection: () => {},
  connections: [],
  setConnections: () => {},
});

export function ConnectionProvider({ children }: React.PropsWithChildren) {
  const [selectedConnection, setSelectedConnection] =
    React.useState<Connection | null>(null);
  const [connections, setConnections] = React.useState<Connection[]>([]);

  return (
    <ConnectionContext.Provider
      value={{
        selectedConnection,
        setSelectedConnection,
        connections,
        setConnections,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
