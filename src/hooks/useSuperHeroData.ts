import axios from "axios";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { SuperHeroDTO } from "../components/SuperHeroes";

export const fetchSuperHeroes = async (heroId?: string): Promise<SuperHeroDTO | null> => {
  if (!heroId) return null;
  const response = await axios.get<SuperHeroDTO>(`http://localhost:4000/superheroes/${heroId}`);
  return response.data;
};

export const useSuperHeroData = (heroId: string | undefined) => {

  const queryClient = useQueryClient();

  return useQuery<SuperHeroDTO | null, Error>({
        queryKey: ['super-hero', heroId],
        queryFn: () => fetchSuperHeroes(heroId),
        initialData: () => {
          const cachedHeroesResult = queryClient.getQueryData<UseQueryResult<SuperHeroDTO[]>>('super-heroes');

          if (cachedHeroesResult?.data) {
              const hero = cachedHeroesResult.
              data.find(hero => hero.id === heroId);
              return hero ? hero : null;
          }
        }
  });
}
