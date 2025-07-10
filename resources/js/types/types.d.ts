export interface TextConfig {
    xAxis: number;
    yAxis: number;
    fontSize: number;
}

export interface ImageConfig {
    xAxis: number;
    yAxis: number;
    scale: number;
}

export interface OfficeId {
    id: number;
    firstname: string;
    lastname: string;
    picture: string;
    position: string | null;
    department: string;
    configs: {
        firstname: TextConfig;
        lastname: TextConfig;
        position?: TextConfig;
        department: TextConfig;
        picture: ImageConfig;
    };
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
}
