import { useQueries } from "react-query";
import { fetchSuperHeroes } from "../hooks/useSuperHeroData";
import { SuperHeroDTO } from "../components/SuperHeroes";

type DynamicParallelPageProps = {
  heroIds: Array<number>;
};

export default function DynamicParallelPage({
  heroIds,
}: DynamicParallelPageProps) {
  const heroes = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeroes(String(id)),
        select: (data: unknown) => {
          const superHeroData = data as { data: SuperHeroDTO };
          return superHeroData.data;
        },
      };
    })
  );

  console.log({ heroes });
  return (
    <>
      <ul>
        {heroes &&
          heroes.map((heroes) => (
            <>
              <li>
                {heroes?.data?.name} - {heroes?.data?.alterEgo}
              </li>
            </>
          ))}
      </ul>
    </>
  );
}
