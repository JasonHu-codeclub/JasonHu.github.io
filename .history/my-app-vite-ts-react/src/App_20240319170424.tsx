import React from   'react';
import Main from './views/Main';
import Home from './views/Home';
import Article from './views/Article';
import Articles from './views/Articles';
import {HashRouter,Routes,Route,Outlet} from 'react-router-dom'

const milestones = {
    posts:Number
}
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Main/>}>
                    <Route path='' element={<Home/>}/>
                    {/* <Route path="posts" element={<Outlet />}></Route> */}
                    <Route path="posts" element={<Outlet/>}>
                        <Route path='' element={<Articles milestone={milestones.posts}/>}/>
                        <Route path=':id' element={<Article/>}/>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;