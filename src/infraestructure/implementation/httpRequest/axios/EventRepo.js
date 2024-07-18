import axios from "axios";
import IEventRepo from "@/domain/repositories/IEventRepo";

class EventRepo extends IEventRepo {
  constructor(id_user) {
    super();
    this.id_user = id_user;
    this.url = "http://localhost:3000/api/events/";
    this.urlId = "http://localhost:3000/api/events/";
    this.urlPost = "http://localhost:3000/api/event/post";
    this.urlPut = "http://localhost:3000/api/event/update/";
    this.urlDelete = "http://localhost:3000/api/event/delete/";
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error("Error fetching los events:", error.message);
      throw error;
    }
  }

  async getOne(_id) {
    try {
      const response = await axios.get(`${this.urlId}${_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching los blogs:", error.message);
      throw error;
    }
  }

  async create(event) {
    try {
      const formData = new FormData();
      formData.append("id_user", event.id_user);
      formData.append("title", event.title);
      formData.append("description", event.description);
      formData.append("image", event.image);
      formData.append("date", event.date);
      formData.append("cost", event.cost);
      formData.append("location", event.location);
      formData.append("b_concluido", event.b_concluido);
      const response = await axios.post(this.urlPost, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          id_user: this.id_user,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el event:", error);
      throw error;
    }
  }

  async update(event) {
    try {
      const formData = new FormData();
      formData.append("id_user", event.id_user);
      formData.append("title", event.title);
      formData.append("description", event.description);
      formData.append("image", event.image);
      formData.append("date", event.date);
      formData.append("cost", event.cost);
      formData.append("location", event.location);
      // formData.append("b_activo", event.b_activo);
      // formData.append("b_cancelado", event.b_cancelado);
      // formData.append("b_concluido", event.b_concluido);
      const response = await axios.put(`${this.urlPut}${event._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          id_user: this.id_user,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  }

  async delete(_id, userId) {
    const response = await axios.delete(`${this.urlDelete}${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId: userId,
      },
    });
    return response.data;
  }
}

export default EventRepo;
