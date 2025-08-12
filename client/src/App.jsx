import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout.jsx"
import { RouteIndex , RouteSignIn, RouteSignUp  } from "./helpers/RouteName"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"

const App = () => {
  return (
    <BrowserRouter >
           <Routes>
             <Route path = {RouteIndex} element={<Layout />} > 
                {/* we'll add our nested routes here */}
                <Route index element={<Index />} />
             </Route >
            <Route path={RouteSignIn} element={<SignIn />} />
            <Route path={RouteSignUp} element={<SignUp />} />
           </Routes>
     </BrowserRouter>
  )
}

export default App
