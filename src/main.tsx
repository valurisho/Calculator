import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    //doesn't want us using !, wants us to be show an error saying to the user that it didn't load
    <StrictMode>
        <App />
    </StrictMode>
);
