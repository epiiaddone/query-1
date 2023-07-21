import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

const fetchOneSuperHero = ({queryKey})=>{
    const heroId = queryKey[1];
    
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}


export const useOneSuperHeroData = (heroId)=>{
    //this has access to the query cache
    const queryClient = useQueryClient();

    //each heroId has a separate query
    return useQuery(
        //query will run, but if data is same as initial query
        //ui will not be updated
        ['super-hero',heroId],
        fetchOneSuperHero,
        {
         initialData: ()=>{
            //get data from cache if possible
            //as super-heroes query contains all necessary data
            const hero = queryClient
                .getQueryData('super-heroes')
                ?.data?.find((hero)=>hero.id===parseInt(heroId))

            if(hero) return {data:hero}
            else return undefined;
         }  
        }
        )
}