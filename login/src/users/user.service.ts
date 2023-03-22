// Repositories
import { UserRepository } from './user.repository';

// Interfaces
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