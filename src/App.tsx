import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SuperHeroes from "./components/SuperHeroes";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  RootLayout,
  RQSuperHero,
  DynamicParallelPage,
  DependantQuery,
  ParallelPage,
  SuperHeroesPage,
} from "./views";

function App() {
  const queryClient = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "super-heroes",
          element: <SuperHeroes />,
        },
        {
          path: "rq-super-heroes",
          element: <SuperHeroesPage />,
        },
        {
          path: "rq-super-heroes/:heroId",
          element: <RQSuperHero />,
        },
        {
          path: "parallel",
          element: <ParallelPage />,
        },
        {
          path: "dynamic-parallel",
          element: <DynamicParallelPage heroIds={[1, 3]} />,
        },
        {
          path: "dependant-query",
          element: <DependantQuery email="lucas@example.com" />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
