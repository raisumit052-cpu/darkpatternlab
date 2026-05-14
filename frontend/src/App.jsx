import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import About from './pages/About'
import PreTest from './pages/PreTest'
import SimulationHub from './pages/SimulationHub'
import Results from './pages/Results'
import PostTest from './pages/PostTest'
import Admin from './pages/Admin'
import ShoppingV1 from './simulations/Shopping/V1'
import ShoppingV2 from './simulations/Shopping/V2'
import ShoppingV3 from './simulations/Shopping/V3'
import CookieV1 from './simulations/Cookie/V1'
import CookieV2 from './simulations/Cookie/V2'
import CookieV3 from './simulations/Cookie/V3'
import SubscriptionV1 from './simulations/Subscription/V1'
import SubscriptionV2 from './simulations/Subscription/V2'
import PermissionsV1 from './simulations/Permissions/V1'
import PermissionsV2 from './simulations/Permissions/V2'

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/pretest" element={<PreTest />} />
          <Route path="/simulations" element={<SimulationHub />} />
          <Route path="/sim/shopping/1" element={<ShoppingV1 />} />
          <Route path="/sim/shopping/2" element={<ShoppingV2 />} />
          <Route path="/sim/shopping/3" element={<ShoppingV3 />} />
          <Route path="/sim/cookie/1" element={<CookieV1 />} />
          <Route path="/sim/cookie/2" element={<CookieV2 />} />
          <Route path="/sim/cookie/3" element={<CookieV3 />} />
          <Route path="/sim/subscription/1" element={<SubscriptionV1 />} />
          <Route path="/sim/subscription/2" element={<SubscriptionV2 />} />
          <Route path="/sim/permissions/1" element={<PermissionsV1 />} />
          <Route path="/sim/permissions/2" element={<PermissionsV2 />} />
          <Route path="/results" element={<Results />} />
          <Route path="/posttest" element={<PostTest />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  )
}
