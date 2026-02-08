import { Routes, Route } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Home from "../pages/Home/Home"
import Error from "../pages/Error/Error"

/**
 * Application router component using React Router v6.
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The main Router component for the application.
 */
const Router = () => {
  return (
    <div className="app">
      {/* Header displayed on all pages */}
      <Header />
      <main role="main">
        {" "}
        {/* SEO compliant main landmark */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      {/* Footer displayed on all pages */}
      <Footer />
    </div>
  )
}

export default Router
