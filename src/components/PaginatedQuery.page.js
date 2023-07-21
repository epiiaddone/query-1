import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"

const fetchColors = (pageNumber)=>{
    //remember the _ before the limit and page in the url
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}


export const PaginatedQueryPage = ()=>{
    const [pageNumber, setPageNumber] = useState(1);
    const {isLoading, isError, error, data, isFetching} = useQuery(
        ['colors',pageNumber],
        ()=>fetchColors(pageNumber),
        {
            keepPreviousData:true,//no isLoading, old data remains until updated
        }
        )

    if(isLoading) return <h2>Loading...</h2>
    if(isError) return <h2>{error.message}</h2>

    return(
        <>
        <div>
            {data?.data.map((color)=>{
                return(
                    <div key={color.id}>
                        <h2>{color.id}:{color.label}</h2>
                    </div>
                )
            })}
        </div>
        <div>
            <button
                onClick={() => setPageNumber((page)=>page-1)}
                disabled={pageNumber===1}
            >
                Prev Page
            </button>
            <button
                onClick={() => setPageNumber((page)=>page+1)}
                disabled={pageNumber===4}
            >
                Next Page
            </button>
        </div>
        <h2>Fetching:{ isFetching? 'true': 'false'}</h2>
        </>

    )
}