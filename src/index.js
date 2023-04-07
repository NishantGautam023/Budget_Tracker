import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = document.querySelector(".root");

function App() {
  return (
    <div>
      <h1>Hello World!!!</h1>
    </div>
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
