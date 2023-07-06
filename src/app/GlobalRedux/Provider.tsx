"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children }: { children: any }) {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
