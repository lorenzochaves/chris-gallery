import { useEffect, useState } from "react"
import api from "../../utils/api"
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa"

const AdminProfilePage = () => {
  const [profile, setProfile] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [profileImages, setProfileImages] = useState([])
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingContacts, setIsSavingContacts] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchAll = async () => {
      const [profileRes, contactsRes, profileImgsRes] = await Promise.all([
        api.get("/api/profile"),
        api.get("/api/profile/contacts"),
        api.get("/api/profile/images"),
      ])
      setProfile(profileRes.data)
      setContacts(contactsRes.data)
      setProfileImages(profileImgsRes.data)
    }
    fetchAll()
  }, [])

  // Editar nome/bio
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setIsSavingProfile(true)
    setError("")
    setSuccess("")
    try {
      await api.put("/api/profile", {
        nome: profile.nome,
        bio: profile.bio,
        subtitulo: profile.subtitulo,
      })
      setSuccess("Perfil atualizado!")
    } catch {
      setError("Erro ao salvar perfil")
    } finally {
      setIsSavingProfile(false)
    }
  }

  // Editar contatos
  const handleContactsChange = (e) => {
    setContacts({ ...contacts, [e.target.name]: e.target.value })
  }
  const handleContactsSubmit = async (e) => {
    e.preventDefault()
    setIsSavingContacts(true)
    setError("")
    setSuccess("")
    try {
      await api.put("/api/profile/contacts", contacts)
      setSuccess("Contatos atualizados!")
    } catch {
      setError("Erro ao salvar contatos")
    } finally {
      setIsSavingContacts(false)
    }
  }

  // Gerenciar imagens do perfil
  const handleAddProfileImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("imagem", file)
    await api.post("/api/profile/images", formData, { headers: { "Content-Type": "multipart/form-data" } })
    setProfileImages([])
    const res = await api.get("/api/profile/images")
    setProfileImages(res.data)
  }
  const handleDeleteProfileImage = async (id) => {
    if (!window.confirm("Remover esta imagem?")) return
    await api.delete(`/api/profile/images/${id}`)
    setProfileImages(profileImages.filter(img => img.id !== id))
  }

  if (!profile || !contacts) return <div className="container mx-auto py-12 px-4">Carregando...</div>

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Editar Sobre Mim & Contatos</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}

        {/* Nome e Bio */}
        <form onSubmit={handleProfileSubmit} className="space-y-6 bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Nome e Biografia</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              name="nome"
              value={profile.nome || ""}
              onChange={handleProfileChange}
              className="input w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtítulo</label>
            <input
              name="subtitulo"
              value={profile.subtitulo || ""}
              onChange={handleProfileChange}
              className="input w-full border rounded px-3 py-2"
              placeholder="Ex: O trabalho de uma vida de abraçar tanto o criativo quanto o quantitativo..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Biografia</label>
            <textarea
              name="bio"
              value={profile.bio || ""}
              onChange={handleProfileChange}
              className="input w-full border rounded px-3 py-2"
              rows={5}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSavingProfile}>
            {isSavingProfile ? "Salvando..." : "Salvar"}
          </button>
        </form>

        {/* Contatos */}
        <form onSubmit={handleContactsSubmit} className="space-y-6 bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Contatos</h2>
          <div className="flex items-center gap-2">
            <FaEnvelope className="h-5 w-5 text-gray-500" />
            <input
              name="email"
              value={contacts.email || ""}
              onChange={handleContactsChange}
              className="input w-full border rounded px-3 py-2"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="h-5 w-5 text-gray-500" />
            <input
              name="telefone"
              value={contacts.telefone || ""}
              onChange={handleContactsChange}
              className="input w-full border rounded px-3 py-2"
              placeholder="Telefone"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp className="h-5 w-5 text-green-500" />
            <input
              name="whatsapp"
              value={contacts.whatsapp || ""}
              onChange={handleContactsChange}
              className="input w-full border rounded px-3 py-2"
              placeholder="WhatsApp"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaInstagram className="h-5 w-5 text-pink-500" />
            <input
              name="instagram"
              value={contacts.instagram || ""}
              onChange={handleContactsChange}
              className="input w-full border rounded px-3 py-2"
              placeholder="Instagram"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSavingContacts}>
            {isSavingContacts ? "Salvando..." : "Salvar"}
          </button>
        </form>

        {/* Imagens do Perfil */}
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Imagens do Perfil (Sobre Mim)</h2>
          <div className="flex flex-wrap gap-4 mb-2">
            {profileImages.map(img => (
              <div key={img.id} className="relative">
                <img src={img.url} alt="Perfil" style={{ maxWidth: 120, borderRadius: 8 }} />
                <button
                  type="button"
                  onClick={() => handleDeleteProfileImage(img.id)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  title="Remover"
                >×</button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" onChange={handleAddProfileImage} />
        </div>
      </div>
    </div>
  )
}

export default AdminProfilePage