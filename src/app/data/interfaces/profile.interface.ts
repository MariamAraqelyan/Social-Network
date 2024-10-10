export interface Profile {
    id: string;
    username: string
    avatarUrl: string | null;
    subscribersAmount: number;
    firstName: string;
    lastName: string;
    isActive: boolean
    stack: string[];
    city: string;
    description: string;
}