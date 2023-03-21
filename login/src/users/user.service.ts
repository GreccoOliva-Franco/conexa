// External modules
import axios from 'axios';

// Repositories
import { UserRepository } from './user.repository';

// Interfaces
import { MongoPaginationFilters, Pagination } from '../shared/interfaces/pagination.interface';
import { UserFilters } from './interfaces/user-filters';
import { UserCreateData } from './interfaces/user-create';
import { UserDocument } from './user.model';

// Errors
import { UserAlreadyExistsError } from '../shared/errors/user.error';
import { MongoDuplicateKeyError } from '../shared/errors/mongo.error';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    };

    public async find(filters: UserFilters, pagination: Pagination) {
        try {
            // const data = await axios.get(
            //     "http://localhost:3001/api/users",
            //     { params: { filters, pagination } }
            // );
            const paginationFilters = {
                skip: pagination.offset ? parseInt(pagination.offset) : 0,
                limit: pagination.limit ? parseInt(pagination.limit) : 10,
            } satisfies MongoPaginationFilters;
            const users = await this.userRepository.find(filters, paginationFilters);

            return users;
        } catch (error: unknown) {
            console.log(error);
            throw error;
        }
    }

    public async create(data: UserCreateData): Promise<UserDocument> {
        try {
            const user = await this.userRepository.create(data);

            return user;
        } catch (error) {
            if (error instanceof MongoDuplicateKeyError) throw new UserAlreadyExistsError();

            console.log(error);
            throw error;
        }
    }
}