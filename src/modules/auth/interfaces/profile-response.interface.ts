import { IUser } from "@shared/interfaces";

export interface IProfileResponse
extends Pick<IUser, 'userid' | 'username' | 'email' | 'createdAt' | 'active'> {}