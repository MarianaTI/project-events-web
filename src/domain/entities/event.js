class Event {
  constructor(
    _id,
    id_user,
    title,
    description,
    image,
    date,
    cost,
    location,
    b_activo,
    b_cancelado,
    b_concluido
  ) {
    this._id = _id;
    this.id_user = id_user;
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = date;
    this.cost = cost;
    this.location = location;
    this.b_activo = b_activo;
    this.b_cancelado = b_cancelado;
    this.b_concluido = b_concluido;
  }
}

export default Event;
