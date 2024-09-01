import ComplainPage from "../pages/complain_page/ComplainPage"
import Footer from "../pages/Footer"
import NavBar from "../pages/NavBar"

function ComplainerLayout() {
  return (
    <div className="dark:bg-slate-900">
      <NavBar />

      <ComplainPage />

      <Footer />
    </div>
  )
}

export default ComplainerLayout
