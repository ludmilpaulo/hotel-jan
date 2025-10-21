"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Edit, Trash2, BedDouble, DollarSign, Upload, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface Room {
  id: number;
  name: string;
  room_type: string;
  description: string;
  price_per_night: string;
  image: string | null;
}

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'file'>('url');
  
  const [formData, setFormData] = useState({
    name: "",
    room_type: "standard",
    description: "",
    price_per_night: "",
    image: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://taki.pythonanywhere.com/api/rooms/");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hotel_rooms'); // You'll need to set this up in Cloudinary
    
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image;
      
      // If user uploaded a file, upload it first
      if (imageUploadMethod === 'file' && imageFile) {
        try {
          imageUrl = await uploadImageToCloudinary(imageFile);
        } catch (error) {
          alert('Erro ao fazer upload da imagem. Usando URL fornecida.');
        }
      }
      
      const roomData = {
        ...formData,
        image: imageUrl,
      };
      
      if (editingRoom) {
        await axios.put(`https://taki.pythonanywhere.com/api/rooms/${editingRoom.id}/`, roomData);
        alert("Quarto atualizado com sucesso!");
      } else {
        await axios.post("https://taki.pythonanywhere.com/api/rooms/", roomData);
        alert("Quarto criado com sucesso!");
      }
      setShowModal(false);
      setEditingRoom(null);
      resetForm();
      fetchRooms();
    } catch (error) {
      console.error("Error saving room:", error);
      alert("Erro ao salvar quarto.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este quarto?")) return;
    
    try {
      await axios.delete(`https://taki.pythonanywhere.com/api/rooms/${id}/`);
      alert("Quarto deletado com sucesso!");
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Erro ao deletar quarto.");
    }
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      room_type: room.room_type,
      description: room.description,
      price_per_night: room.price_per_night,
      image: room.image || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      room_type: "standard",
      description: "",
      price_per_night: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setImageUploadMethod('url');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestão de Quartos</h1>
              <p className="text-black/80">Gerencie todos os quartos do hotel</p>
            </div>
            <button
              onClick={() => {
                setEditingRoom(null);
                resetForm();
                setShowModal(true);
              }}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Quarto
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <nav className="flex gap-6 py-4">
            <Link href="/admin" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Reservas
            </Link>
            <Link href="/admin/rooms" className="text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-2">
              Quartos
            </Link>
            <Link href="/admin/guests" className="text-gray-600 hover:text-yellow-600 font-medium pb-2 transition">
              Hóspedes
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando quartos...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                <div className="h-48 relative overflow-hidden">
                  {room.image ? (
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center ${room.image ? 'hidden' : ''}`}>
                    <BedDouble className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">{room.room_type}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-yellow-600">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-bold text-lg">
                      Kz {parseFloat(room.price_per_night).toLocaleString('pt-PT')} / noite
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(room)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full animate-scale-in">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-black rounded-t-3xl">
              <h2 className="text-2xl font-bold">
                {editingRoom ? "Editar Quarto" : "Adicionar Novo Quarto"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome do Quarto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                  placeholder="Ex: Quarto Deluxe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Quarto *
                </label>
                <select
                  required
                  value={formData.room_type}
                  onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none resize-none"
                  placeholder="Descrição do quarto..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preço por Noite (Kz) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price_per_night}
                  onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                  placeholder="150000"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Imagem do Quarto
                </label>
                
                {/* Upload Method Toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setImageUploadMethod('url')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      imageUploadMethod === 'url'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadMethod('file')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      imageUploadMethod === 'file'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>

                {/* URL Input */}
                {imageUploadMethod === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    {formData.image && (
                      <div className="mt-3">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* File Upload */}
                {imageUploadMethod === 'file' && (
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 font-medium">
                          Clique para selecionar uma imagem
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG, JPEG até 10MB
                        </p>
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-3">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition"
                >
                  {editingRoom ? "Atualizar" : "Criar"} Quarto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRoom(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

