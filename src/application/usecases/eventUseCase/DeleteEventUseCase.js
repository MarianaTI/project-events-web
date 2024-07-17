import IEventRepo from "@/domain/repositories/IEventRepo";

class DeleteEventUseCase {
  constructor(eventRepo) {
    if (!(eventRepo instanceof IEventRepo))
      throw new Error("eventRepo must be instance of IEventRepo");
    this.eventRepo = eventRepo;
  }

  async run(_id, userId) {
    const event = await this.eventRepo.delete(_id, userId);
    if (!event) {
      throw new Error(`Event with ID ${_id} not found`);
    }
    return { message: `Event with ID ${_id} has been deleted` };
  }
}

export default DeleteEventUseCase;
