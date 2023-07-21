import { useState } from "react";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroData";
import { Link } from "react-router-dom";


const successFn = (data)=> console.log("sucess", data);
const failFn = (error)=> console.log("fail", error);


export const RQSuperHeroesPage = () =>{
    const [nameInput, setNameInput] = useState('');
    const [alterEgoInput, setAlterEgoInput] = useState('');

    // has to be called data
    const {isLoading, data, isError, error} =  useSuperHeroesData(successFn,failFn)
    
    
    //alias
const {mutate:addHero} = useAddSuperHeroData();

const handleAddHeroClick = ()=>{
    const hero={name:nameInput, alterEgo:alterEgoInput}
    addHero(hero);
}
    

    if (isLoading) {
        return <h2>Loading...</h2>
      }

      if(isError){
        return <h2>{error.message}</h2>
      }

    return(
        <>
        <h2>RQ Superheros Page</h2>
        <div>
            <input
                type='text'
                value={nameInput}
                onChange={(e)=>setNameInput(e.target.value)}
            />
            <input
                type='text'
                value={alterEgoInput}
                onChange={(e)=>setAlterEgoInput(e.target.value)}
            />
            <button onClick={handleAddHeroClick}>Add Hero</button>
        </div>
        {data?.data.map((hero)=>{
            return( 
                <div key={hero.id}>
                    <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                </div>
            )
        })}
        {/* {data.map((hero)=>{//for processed query results don't need data.data
            return <div key={hero}>{hero}</div>
        })} */}
        </>
    )
}