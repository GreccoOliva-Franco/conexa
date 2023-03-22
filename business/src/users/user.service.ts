// Repositories
import { UserRepository } from './user.repository';

// Interfaces
import { MongoPaginationFilters, Pagination } from '../shared/interfaces/pagination.interface';
import { UserFilters } from './interfaces/user-filters';
import { UserDocument } from './user.model';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    };

    public async find(filters: UserFilters, pagination: Pagination): Promise<UserDocument[]> {
        try {
            const paginationFilters = {
                skip: pagination.offset ? parseInt(pagination.offset) || 0 : 0,
                limit: pagination.limit ? parseInt(pagination.limit) || 10 : 10,
            } satisfies MongoPaginationFilters;
            const users = await this.userRepository.find(filters, paginationFilters);

            return users;
        } catch (error: unknown) {
            console.log(error);
            throw error;
        }
    }
}