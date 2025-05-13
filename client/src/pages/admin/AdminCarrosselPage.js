import { useEffect, useState } from "react"
import api from "../../utils/api"
import "../../styles/admin.css"

const AdminCarrosselPage = () => {
  const [carrosselImages, setCarrosselImages] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchImgs()
  }, [])

  const fetchImgs = async () => {
    const res = await api.get("/api/profile/homepage-carrossel")
    setCarrosselImages(res.data)
  }

  const handleAddCarrosselImage = async (e) => {
    setError("")
    setSuccess("")
    const file = e.target.files[0]
    if (!file) return
    if (carrosselImages.length >= 5) {
      setError("Limite de 5 imagens atingido!")
      return
    }
    const formData = new FormData()
    formData.append("imagem", file)
    try {
      await api.post("/api/profile/homepage-carrossel", formData, { headers: { "Content-Type": "multipart/form-data" } })
      setSuccess("Imagem adicionada!")
      fetchImgs()
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao adicionar imagem")
    }
  }

  const handleDeleteCarrosselImage = async (id) => {
    if (!window.confirm("Remover esta imagem?")) return
    await api.delete(`/api/profile/homepage-carrossel/${id}`)
    fetchImgs()
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Customizar Carrossel da Home</h1>
        </div>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        {success && <div className="admin-alert admin-alert-success">{success}</div>}

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="text-xl font-semibold">Imagens do Carrossel</h2>
          </div>
          <div className="admin-card-body">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {carrosselImages.map(img => (
                <div key={img.id} className="admin-image-preview">
                  <img src={img.url} alt="Carrossel" className="w-full h-full object-cover" />
                  <div className="admin-image-actions">
                    <button
                      type="button"
                      onClick={() => handleDeleteCarrosselImage(img.id)}
                      className="admin-image-action-button"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {carrosselImages.length < 5 && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAddCarrosselImage}
                className="admin-input"
              />
            )}
            <div className="text-sm text-gray-500 mt-2">Máximo de 5 imagens.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCarrosselPage