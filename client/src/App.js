import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import PortfolioPage from "./pages/PortfolioPage"
import ArtworkDetailPage from "./pages/ArtworkDetailPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage"
import AdminNewCategoryPage from "./pages/admin/AdminNewCategoryPage"
import AdminEditCategoryPage from "./pages/admin/AdminEditCategoryPage"
import AdminNewArtworkPage from "./pages/admin/AdminNewArtworkPage"
import AdminEditArtworkPage from "./pages/admin/AdminEditArtworkPage"
import AdminProfilePage from "./pages/admin/AdminProfilePage"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "./pages/NotFoundPage"
import AdminCarrosselPage from "./pages/admin/AdminCarrosselPage"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ArtworkDetailPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories/new"
            element={
              <ProtectedRoute>
                <AdminNewCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={
              <ProtectedRoute>
                <AdminEditCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/artworks/new"
            element={
              <ProtectedRoute>
                <AdminNewArtworkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/artworks/edit/:id"
            element={
              <ProtectedRoute>
                <AdminEditArtworkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/carrossel"
            element={
              <ProtectedRoute>
                <AdminCarrosselPage />
              </ProtectedRoute>
            }
          />

          {/* Página 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
