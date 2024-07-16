import IEventRepo from "@/domain/repositories/IEventRepo";

class GetOneEventUseCase {
    constructor(eventRepo) {
        if(!(eventRepo instanceof IEventRepo))
            throw new Error("eventRepo must be instance of IEventRepo");
        this.eventRepo = eventRepo;
    }

    async run(_id) {
        const event = await this.eventRepo.getOne(_id);
        return event;
    }
}

export default GetOneEventUseCase;