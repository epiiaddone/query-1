import axios from "axios";
import { useQueries } from "react-query";


const fetchOneSuperHero = (heroId)=>{  
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const DynamicParallelQueryPage = ({heroIds})=>{
    useQueries(
        heroIds.map((id)=>{
            return{
                queryKey:['super-hero', id],
                queryFn: ()=> fetchOneSuperHero(id)
            }
        })
    )

    return <h2>Dynamic Parallel Query</h2>
}