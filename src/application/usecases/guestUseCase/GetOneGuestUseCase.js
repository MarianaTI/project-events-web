import IGuestRepo from "@/domain/repositories/IGuestRepo";

class GetOneGuestUseCase {
    constructor(guestRepo) {
        if(!(guestRepo instanceof IGuestRepo))
            throw new Error("eventRepo must be instance of IEventRepo");
        this.guestRepo = guestRepo;
    }

    async run(_id) {
        const guest = await this.guestRepo.getOne(_id);
        return guest;
    }
}

export default GetOneGuestUseCase;