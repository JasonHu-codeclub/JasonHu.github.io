// import React from "react";
import Main from "./views/Main";
import Home from "./views/Home";
import Article from "./views/Article";
import Articles from "./views/Articles";
import {HashRouter, Routes, Route, Outlet} from "react-router-dom";
import Gallery from "./views/Gallery.tsx";
import GalleryPost from "./views/GalleryPost.tsx";

const milestones = {
    posts: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS),
    snippets: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS),
};
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>}>

                    <Route path="" element={<Home/>}/>

                    <Route path="posts" element={<Outlet/>}>
                        <Route
                            path=""
                            element={<Articles milestone={milestones.posts}/>}
                        />
                        <Route path=":id" element={<Article/>}/>
                    </Route>

                    <Route path="snippets" element={<Outlet/>}>
                        <Route
                            path=""
                            element={<Articles milestone={milestones.snippets}/>}
                        />
                        <Route path=":id" element={<Article/>}/>
                    </Route>

                    <Route path="projects" element={<Outlet/>}>
                        <Route
                            path=""
                            element={<Articles milestone={milestones.snippets}/>}
                        />
                    </Route>

                    <Route path="gallery" element={<Outlet/>}>
                        <Route
                            path=""
                            element={<Gallery/>}
                        />
                        <Route path=":id" element={<GalleryPost/>}/>
                    </Route>
                </Route>

            </Routes>
        </HashRouter>
    );
};

export default App;
