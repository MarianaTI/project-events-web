import axios from "axios";
import IEventRepo from "@/domain/repositories/IEventRepo";

class EventRepo extends IEventRepo {
  constructor(id_user) {
    super();
    this.id_user = id_user;
    this.urlPost = "http://localhost:3000/api/event/post";
  }

  async create(event) {
    try {
      const formData = new FormData();
      formData.append("id_user", blog.id_user);
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("image", blog.image);
      formData.append("date", blog.date);
      formData.append("cost", blog.cost);
      formData.append("location", blog.location);
      const response = await axios.post(this.urlPost, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          id_user: this.id_user,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el blog:", error);
      throw error;
    }
  }
}

export default EventRepo;