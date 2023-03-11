export interface EntityConstructor<T> {
    new (data?: any): T;
}

export interface ValidationError {

    name: string;
    regex?: string;
    required?: string;
}

export interface EntityStorageProps {
    disabled?: boolean;
    ttl?: number;
    prefix?: string;
    ctor?: EntityConstructor<Entity>;
}
