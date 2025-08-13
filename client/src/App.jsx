import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout.jsx"
import { RouteIndex , RouteSignIn, RouteSignUp  } from "./helpers/RouteName"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import WatchPage from "./pages/WatchPage.jsx"

const App = () => {
  return (
    <BrowserRouter >
           <Routes>
             <Route path = {RouteIndex} element={<Layout />} > 
                {/* we'll add our nested routes here */}
                <Route index element={<Index />} />
                <Route path="/watch/:videoId" element={<WatchPage />} />
             </Route >
            <Route path={RouteSignIn} element={<SignIn />} />
            <Route path={RouteSignUp} element={<SignUp />} />
           </Routes>
     </BrowserRouter>
  )
}

export default App
