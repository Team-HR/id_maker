export interface FieldConfig {
    xAxis: number;
    yAxis: number;
    fontSize: number;
}

export interface PictureConfig {
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
        firstname: FieldConfig;
        lastname: FieldConfig;
        position?: FieldConfig;
        department: FieldConfig;
        picture: PictureConfig;
    };
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
}
