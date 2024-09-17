import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../components"


export const MainLayout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}