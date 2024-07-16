class Event {
    constructor (_id, id_user, title, description, image, date, cost, location) {
        this._id = _id;
        this.id_user = id_user;
        this.title = title;
        this.description = description;
        this.image = image;
        this.date = date;
        this.cost = cost;
        this.location = location;
    }
}

export default Event;