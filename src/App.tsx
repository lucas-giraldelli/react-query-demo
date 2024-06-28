import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SuperHeroes from "./components/SuperHeroes";
import RQSuperHeroes from "./components/RQSuperHeroes";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RootLayout } from "./views/RootLayout";
import { RQSuperHero } from "./views/RQSuperHero";
import { DynamicParallelPage } from "./views/DynamicParallelPage";
import ParallelPage from "./views/ParallelPage";
import { DependantQuery } from "./views/DependantQuery";

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
          element: <RQSuperHeroes />,
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
