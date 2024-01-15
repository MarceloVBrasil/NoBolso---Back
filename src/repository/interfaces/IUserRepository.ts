import { IUser } from "../../models/User";

export interface IUserRepository {
    getByEmail(email: string): Promise<IUser | null>
    getById(userId: string): Promise<IUser | null>
    add(user: IUser): Promise<IUser>
    update(userId: string, user: IUser): Promise<IUser>
    delete(userId: string): Promise<string>
}