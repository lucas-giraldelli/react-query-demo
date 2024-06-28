import axios from "axios";
import { useQuery } from "react-query";
import { SuperHeroDTO } from "../components/SuperHeroes";

export const fetchSuperHeroes = (heroId?: string) => {
  if (!heroId) return;
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId: string | undefined) => {

    return useQuery({
        queryKey: ['super-heroes', heroId],
        queryFn: () => fetchSuperHeroes(heroId),
        select: (data) => {
          return data?.data as SuperHeroDTO;
        }
    });
}
