import {useMutation, useQuery, useQueryClient} from 'react-query';
import { request } from '../utils/axios-utils';

const fetchSuperHeroes = ()=> {
    //return a promise
    //return axios.get('http://localhost:4000/superheroes');

    return request({url: '/superheroes'})
}

//the component should have control over the success and error
//so pass as parameters
export const useSuperHeroesData = (successFn, failFn)=>{
   return  useQuery(
        'super-heroes',
        fetchSuperHeroes,
        {
            onSuccess: successFn,
            onError: failFn,
            // select: (data)=>{
            //     const names = data.data.map((hero)=>hero.name)
            //     return names;
            // }
        })
}


const addSuperHero = (hero)=>{
    //return axios.post(`http://localhost:4000/superheroes`, hero)

    return request({url: '/superheroes', method: 'post', data:hero})
}

export const useAddSuperHeroData = ()=>{
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data)=>{//data is in the response from the post request

        //     //trigger new query after successful post Lesson22
        //     //queryClient.invalidateQueries('super-heroes')

        //     //update the query data without another network request Lesson23
        //     queryClient.setQueryData('super-heroes', (oldQueryData)=>{
        //         return{
        //             ...oldQueryData,
        //             data:[...oldQueryData.data, data.data]
        //         }
        //     })
        // }

        // for optimistic updates
        onMutate: async (newHero)=>{
            //prevent the get request to update the query
            await queryClient.cancelQueries('super-heroes');

            const previousHeroData = queryClient.getQueryData('super-heroes');

            //update query data directly on the client side
            //so that the app apears very fast to the user
            queryClient.setQueryData('super-heroes', (oldQueryData)=>{
                return{
                    ...oldQueryData,
                    data:[
                        ...oldQueryData.data,
                        //this looks super hacky
                        //won't work if an entry has been deleted
                        {id:oldQueryData?.data?.length + 1, ...newHero}
                    ]
                }
            })
            return previousHeroData;
        },
        // add _ for not used variables
        onError: (_error, _hero, context ) =>{
            //return query to original state
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: ()=>{
            //ensure client state and server state are insync
            queryClient.invalidateQueries('super-hero');
        }
    })
}