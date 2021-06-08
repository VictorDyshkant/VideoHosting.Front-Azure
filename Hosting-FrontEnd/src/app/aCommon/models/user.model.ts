export class UserModel {
    id: string;
    name: string;
    email: string;
    surname: string;
    photoPath: string;
    group: string;
    dayOfCreation: Date;
    subscribers: number;
    subscriptions: number;
    roles: string[];
    doSubscribed: boolean;
}