import React from   'react';
import Main from './views/Main';
import {HashRouter,Routes,Route,Outlet} from 'react-router-dom'
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Main/>}>

                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;