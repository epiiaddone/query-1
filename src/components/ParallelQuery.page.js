import axios from "axios";
import { useQuery } from "react-query";


const fetchSuperHeroes = ()=> {
    //return a promise
    return axios.get('http://localhost:4000/superheroes');
}

const fetchFriends = ()=> {
    //return a promise
    return axios.get('http://localhost:4000/friends');
}


export const ParallelQueryPage = ()=>{
    //parallel by default
    //use aliases for the data object
    const {data:superHeroData} = useQuery('super-heroes', fetchSuperHeroes);
    const {data:friendsData} = useQuery('friends', fetchFriends);

    return <h2>Parallel query</h2>
}