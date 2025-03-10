import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
