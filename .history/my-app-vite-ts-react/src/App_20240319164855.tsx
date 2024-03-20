import React from   'react';
import Main from './views/Main';
import Home from './views/Home';
import {HashRouter,Routes,Route,Outlet} from 'react-router-dom'
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Main/>}>
                    <Route path='' element={<Home/>}/>
                    {/* <Route path="posts" element={<Outlet />}></Route> */}
                    <Route path="posts" element={<Outlet/>}>
                        <Route path='' element={<Articles/>}></Route>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;