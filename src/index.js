import React from 'react';
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from './App';

const root = document.querySelector('#root')
const reactRoot = createRoot(root)
reactRoot.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
)

