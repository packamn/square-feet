import { ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'

import BaseLayout from '../layouts/BaseLayout'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Properties from '../pages/Properties'
import Sell from '../pages/Sell'

type AppRoutesProps = {
  LandingOverride?: ComponentType
}

const AppRoutes = ({ LandingOverride }: AppRoutesProps) => {
  const LandingComponent = LandingOverride ?? Home

  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<LandingComponent />} />
        <Route path="properties" element={<Properties />} />
        <Route path="sell" element={<Sell />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes
