export interface User {
    id: number;
    department: string;
    username: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
