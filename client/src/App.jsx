import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout.jsx"
import { RouteIndex, RouteSignIn, RouteSignUp, RouteChannels, RouteChannel } from "./helpers/RouteName"
import ChannelList from "./components/ChannelList"
import ChannelPage from "./pages/ChannelPage"
import CreateChannel from "./pages/CreateChannel"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import WatchPage from "./pages/WatchPage.jsx"
import SearchResults from "./pages/SearchResults.jsx"

const App = () => {
  return (
    <BrowserRouter >
           <Routes>
             <Route path = {RouteIndex} element={<Layout />} > 
                {/* we'll add our nested routes here */}
                <Route index element={<Index />} />
                <Route path="/watch/:videoId" element={<WatchPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path={RouteChannels} element={<ChannelList />} />
                <Route path={RouteChannel} element={<ChannelPage />} />
                <Route path="/create-channel" element={<CreateChannel />} />
             </Route >
            <Route path={RouteSignIn} element={<SignIn />} />
            <Route path={RouteSignUp} element={<SignUp />} />
           </Routes>
     </BrowserRouter>
  )
}

export default App
