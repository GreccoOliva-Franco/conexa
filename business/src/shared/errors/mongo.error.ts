export class MongoDuplicateKeyError extends Error {
    public readonly name: string;
    public readonly fields: string[];

    constructor(keyPattern: Object) {
        super('Duplicate key error');
        this.name = 'DuplicateKeyError';
        this.fields = this.mapFields(keyPattern);
    }

    private mapFields(keyPattern: Object): string[] {
        return Object.keys(keyPattern);
    }
}