import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {RecoilRoot} from "recoil";
import {CookiesProvider} from "react-cookie";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

reportWebVitals();
