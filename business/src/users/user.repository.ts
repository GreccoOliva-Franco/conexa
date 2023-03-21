// External modules
import { FilterQuery } from 'mongoose';

// Models
import { UserModel, UserDocument, IUser } from './user.model';

// Interfaces
import { UserCreateData } from './interfaces/user-create';
import { UserFilters } from './interfaces/user-filters';
import { MongoPaginationFilters } from '../shared/interfaces/pagination.interface';

// Errors
import { MongoDuplicateKeyError } from '../shared/errors/mongo.error';

export class UserRepository {
    private readonly model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    };

    find(filters: UserFilters, pagination: MongoPaginationFilters): Promise<UserDocument[]> {
        const parsedFilters: FilterQuery<IUser> = {};
        if (filters.email) parsedFilters.email = new RegExp(`.*${filters.email}.*`, "gi");

        return this.model.find(parsedFilters).skip(pagination.skip).limit(pagination.limit).exec();
    }

    findByEmail(email: string): Promise<UserDocument | null> {
        return this.model.findOne({ email }).exec();
    }

    findByEmailWithPassword(email: string): Promise<UserDocument | null> {
        return this.model.findOne({ email }).select("+_id +email +password").exec();
    }

    async create(data: UserCreateData): Promise<UserDocument> {
        try {
            const user = await this.model.create(data);

            return user;
        } catch (error: any) {
            if (error.code === 11000) throw new MongoDuplicateKeyError(error.keyPattern);

            throw error;
        }
    }
}
