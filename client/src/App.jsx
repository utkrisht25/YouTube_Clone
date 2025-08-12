import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout.jsx"
import { RouteIndex } from "./helpers/RouteName"
import Index from "./pages/Index"

const App = () => {
  return (
    <BrowserRouter >
           <Routes>
             <Route path = {RouteIndex} element={<Layout />} > 
                {/* we'll add our nested routes here */}
                <Route index element={<Index />} />
             </Route >

           </Routes>
     </BrowserRouter>
  )
}

export default App
