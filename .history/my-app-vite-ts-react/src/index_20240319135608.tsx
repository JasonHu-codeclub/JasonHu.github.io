import React from 'react';
import {createRoot} from "react-dom/client";
import App from './App'
import BaseStyles from './css/BaseStyles';
const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);
root.render(
    <>
        <BaseStyles/>
        <App/>
    </>
);




