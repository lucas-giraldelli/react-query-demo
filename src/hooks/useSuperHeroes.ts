import axios from "axios";
import { useQuery } from "react-query";
import { SuperHeroDTO } from "../components/SuperHeroes";

export const useSuperHeroesData = (
    onSuccess?: (data: Array<SuperHeroDTO>) => void | undefined,
    onError?: (error: Error) => void | undefined,
    pooling: boolean = false,
    fetchOnMount: boolean = true
) => {

    const fetchSuperHeroes = () => {
        return axios.get('http://localhost:4000/superheroes')
    }

    return useQuery({
        queryKey: 'super-heroes',
        queryFn: fetchSuperHeroes,
        //cacheTime: 1000 * 60 * 5, // <-- default cache time in milliseconds
        //staleTime: 0, // <-- default stale time | to keep stale data
        enabled: fetchOnMount, //<-- for triggering it from onClick, refetch from useQuery
        refetchOnMount: fetchOnMount, //<-- refetchOnMount
        //refetchOnWindowFocus: 'always', //<-- refetchOnWindowFocus
        refetchInterval: pooling ? 2000 : false, //<-- polling interval
        //refetchIntervalInBackground: true //<-- polling on background
        onSuccess,
        onError, // <-- tries 4x before throwing error
        select: (data) => {
            console.log({data});
            const superHeroesName: Array<SuperHeroDTO> = data.data.map((hero: SuperHeroDTO) => hero);
            return superHeroesName
        } // <-- this is for data trasformation
    });
}
