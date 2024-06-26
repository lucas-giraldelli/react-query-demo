import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SuperHeroes from './components/SuperHeroes';
import RQSuperHeroes from './components/RQSuperHeroes';
import Home from './components/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

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
                </ul>
                </nav>
                <Routes>
                <Route path='/super-heroes' element={<SuperHeroes />} />
                <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
                <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
    );
}

export default App;
