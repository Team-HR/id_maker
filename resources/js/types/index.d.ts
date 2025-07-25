import { FieldConfig } from "./types";

export interface User {
    id: number;
    department: string;
    username: string;
    status: "active" | "inactive";
    roles: ("sudo_admin" | "editor")[];
    configs: {
        office_id_template?: {
            department?: FieldConfig;
            firstname?: FieldConfig;
        };
    };
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
