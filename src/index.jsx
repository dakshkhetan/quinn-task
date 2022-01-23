import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./pages";

import "./styles/global.css";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Home />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("app")
);
