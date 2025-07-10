export interface TextConfig {
    value: string;
    xAxis: number;
    yAxis: number;
    fontSize: number;
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
        picture: string;
    };
    created_at: string;
    updated_at: string;
}
