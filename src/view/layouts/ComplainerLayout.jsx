import ComplainPage from "../pages/complain_page/ComplainPage"
import Footer from "../pages/Footer"
import NavBar from "../pages/NavBar"

function ComplainerLayout() {
  return (
    <div>
      <NavBar />

      <ComplainPage />

      <Footer />
    </div>
  )
}

export default ComplainerLayout
