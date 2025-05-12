import { useEffect, useState } from "react"
import api from "../../utils/api"

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
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Customizar Carrossel da Home</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        <div className="flex flex-wrap gap-4 mb-4">
          {carrosselImages.map(img => (
            <div key={img.id} className="relative">
              <img src={img.url} alt="Carrossel" style={{ maxWidth: 120, borderRadius: 8 }} />
              <button
                type="button"
                onClick={() => handleDeleteCarrosselImage(img.id)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                title="Remover"
              >×</button>
            </div>
          ))}
        </div>
        {carrosselImages.length < 5 && (
          <input type="file" accept="image/*" onChange={handleAddCarrosselImage} />
        )}
        <div className="text-sm text-gray-500 mt-2">Máximo de 5 imagens.</div>
      </div>
    </div>
  )
}

export default AdminCarrosselPage