import { useEffect, useState } from "react"
import api from "../../utils/api"
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa"
import { Link } from "react-router-dom"
import "../../styles/admin.css"

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

  if (!profile || !contacts) {
    return (
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Editar Sobre Mim & Contatos</h1>
          <div className="admin-actions">
            <Link to="/admin/dashboard" className="admin-button admin-button-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Voltar
            </Link>
          </div>
        </div>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        {success && <div className="admin-alert admin-alert-success">{success}</div>}

        {/* Nome e Bio */}
        <div className="admin-card mb-8">
          <div className="admin-card-header">
            <h2 className="text-xl font-semibold">Nome e Biografia</h2>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleProfileSubmit} className="admin-form">
              <div className="admin-form-group">
                <label className="admin-label">Nome</label>
                <input
                  name="nome"
                  value={profile.nome || ""}
                  onChange={handleProfileChange}
                  className="admin-input"
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subtítulo</label>
                <input
                  name="subtitulo"
                  value={profile.subtitulo || ""}
                  onChange={handleProfileChange}
                  className="admin-input"
                  placeholder="Ex: O trabalho de uma vida de abraçar tanto o criativo quanto o quantitativo..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Biografia</label>
                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleProfileChange}
                  className="admin-textarea"
                  rows={5}
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="admin-button admin-button-primary" disabled={isSavingProfile}>
                  {isSavingProfile ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contatos */}
        <div className="admin-card mb-8">
          <div className="admin-card-header">
            <h2 className="text-xl font-semibold">Contatos</h2>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleContactsSubmit} className="admin-form">
              <div className="admin-form-group">
                <label className="admin-label flex items-center gap-2">
                  <FaEnvelope className="h-5 w-5 text-gray-500" />
                  Email
                </label>
                <input
                  name="email"
                  value={contacts.email || ""}
                  onChange={handleContactsChange}
                  className="admin-input"
                  placeholder="Email"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label flex items-center gap-2">
                  <FaPhone className="h-5 w-5 text-gray-500" />
                  Telefone
                </label>
                <input
                  name="telefone"
                  value={contacts.telefone || ""}
                  onChange={handleContactsChange}
                  className="admin-input"
                  placeholder="Telefone"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label flex items-center gap-2">
                  <FaWhatsapp className="h-5 w-5 text-green-500" />
                  WhatsApp
                </label>
                <input
                  name="whatsapp"
                  value={contacts.whatsapp || ""}
                  onChange={handleContactsChange}
                  className="admin-input"
                  placeholder="WhatsApp"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label flex items-center gap-2">
                  <FaInstagram className="h-5 w-5 text-pink-500" />
                  Instagram
                </label>
                <input
                  name="instagram"
                  value={contacts.instagram || ""}
                  onChange={handleContactsChange}
                  className="admin-input"
                  placeholder="Instagram"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="admin-button admin-button-primary" disabled={isSavingContacts}>
                  {isSavingContacts ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Imagens do Perfil */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="text-xl font-semibold">Imagens do Perfil (Sobre Mim)</h2>
          </div>
          <div className="admin-card-body">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {profileImages.map(img => (
                <div key={img.id} className="admin-image-preview">
                  <img src={img.url} alt="Perfil" className="w-full h-full object-cover" />
                  <div className="admin-image-actions">
                    <button
                      type="button"
                      onClick={() => handleDeleteProfileImage(img.id)}
                      className="admin-image-action-button"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAddProfileImage}
              className="admin-input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfilePage