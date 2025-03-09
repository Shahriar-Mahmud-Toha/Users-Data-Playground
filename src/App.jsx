import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import NotFound from './pages/NotFound';
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
