import { IUser } from "@shared/interfaces";

export interface IProfileResponse
extends Pick<IUser, 'id' | 'username' | 'email' | 'createdAt' | 'active'> {}