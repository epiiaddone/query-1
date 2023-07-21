import axios from "axios"
import { Fragment } from "react"
import { useInfiniteQuery } from "react-query"

//pageParam is automatically injected by useInfiniteQuery()
//default value of 1
const fetchColors = ({pageParam = 1})=>{
    //remember the _ before the limit and page in the url
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}


//unlike pagination, there is not current page state
export const InfiniteQueryPage = ()=>{
    
    const {
        isLoading,
        isError,
        error,
        data,
        hasNextPage,//hasNextPage is false if getNextPageParam returns undefined
        fetchNextPage,
        isFetching, 
        isFetchingNextPage
    } = useInfiniteQuery(
        ['colors'],
        fetchColors,
        {
            getNextPageParam:(_lastPage, pages)=>{
                if(pages.length < 4) return pages.length + 1
                else return undefined
            }
        }
        )

        if(isLoading) return <h2>Loading...</h2>
        if(isError) return <h2>{error.message}</h2>

    return(
        <>
        <div>
            {/* not data.data */}
            {data?.pages.map((group,index)=>{
                return(//unlike pagination, infinite query requires nested mapping
                    <Fragment key={index}>
                        {group.data.map(color=>{
                            return(
                                <div key={color.id}>
                                    <h2>{color.id}:{color.label}</h2>
                                </div>
                            )})}
                    </Fragment>
                )
            })}
        </div>
        <button
            onClick={fetchNextPage}
            disabled={!hasNextPage}>
                Load More
            </button>
        <div>
            Fetching:{isFetching? 'true' : 'false'}
        </div>
        <div>
            FetchingNextPage:{isFetchingNextPage? 'true' : 'false'}
        </div>
        </>
    )

}