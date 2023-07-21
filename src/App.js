import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQOneSuperHeroPage } from './components/RQOneSuperHero.page'
import { ParallelQueryPage } from './components/ParallelQuery.page'
import { DynamicParallelQueryPage } from './components/DynamicParallelQuery.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
import { PaginatedQueryPage } from './components/PaginatedQuery.page'
import { InfiniteQueryPage } from './components/InfiniteQuery.page'

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/parallel-query'>Parallel Query</Link>
            </li>
            <li>
              <Link to='/dynamic-parallel-query'>Dynamic Parallel Query</Link>
            </li>
            <li>
              <Link to='/rq-dependent'>Dependent Query</Link>
            </li>
            <li>
              <Link to='/paginated-query'>Paginated Query</Link>
            </li>
            <li>
              <Link to='/rq-infinite'>Infinite Query</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path='/rq-dependent' element={<DependentQueriesPage email="test@test.com" />}/>
          <Route path='/dynamic-parallel-query' element={<DynamicParallelQueryPage heroIds={[1,3]} />}/>
          <Route path='/parallel-query' element={<ParallelQueryPage />}/>
          <Route path='/rq-infinite' element={<InfiniteQueryPage />}/>
          <Route path='/paginated-query' element={<PaginatedQueryPage />}/>
          <Route path='/super-heroes' element={<SuperHeroesPage />}/>
          <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />}/>
          <Route path='/rq-super-heroes/:heroId' element={<RQOneSuperHeroPage />}/>
          <Route path='/' element={<HomePage />}/>
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App