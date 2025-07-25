import { FieldConfig, PictureConfig } from "@/types/types";
import React from "react";

interface Props {
    picturePreviewUrl: string;
    picturePreviewConfig: PictureConfig;
    firstname: string;
    firstnameConfig: FieldConfig;
    lastname: string;
    lastnameConfig: FieldConfig;
    position?: string;
    positionConfig?: FieldConfig;
    department: string;
    departmentConfig: FieldConfig;
    className?: string;
}

const CardLayout = ({
    picturePreviewUrl,
    picturePreviewConfig,
    firstname,
    firstnameConfig,
    lastname,
    lastnameConfig,
    position,
    positionConfig,
    department,
    departmentConfig,
    className,
}: Props) => {
    return (
        <div
            style={{ width: "3.79in", height: "5.48in" }}
            className={`relative overflow-hidden shadow bg-base-100 ${className}`}
        >
            <img
                src="/images/office_id_template.png"
                alt="id template"
                className="relative z-10 object-contain w-full h-full pointer-events-none "
            />
            <img
                src={picturePreviewUrl}
                alt="pp"
                className="absolute z-[5] object-cover"
                style={{
                    right: picturePreviewConfig.xAxis,
                    top: picturePreviewConfig.yAxis,
                    width: picturePreviewConfig.scale,
                }}
            />

            <div
                className="absolute z-20 font-semibold uppercase text-base-100"
                style={{
                    fontSize: firstnameConfig.fontSize,
                    right: firstnameConfig.xAxis,
                    top: firstnameConfig.yAxis,
                }}
            >
                {firstname}
            </div>
            <div
                className="absolute z-20 font-semibold uppercase text-base-100"
                style={{
                    fontSize: lastnameConfig.fontSize,
                    right: lastnameConfig.xAxis,
                    top: lastnameConfig.yAxis,
                }}
            >
                {lastname}
            </div>
            <div
                className="absolute z-20 font-serif text-neutral"
                style={{
                    fontSize: positionConfig?.fontSize,
                    right: positionConfig?.xAxis,
                    top: positionConfig?.yAxis,
                }}
            >
                {position}
            </div>
            <div
                className="absolute z-20 leading-5 max-w-80 text-end text-base-100"
                style={{
                    fontSize: departmentConfig.fontSize,
                    right: departmentConfig.xAxis,
                    top: departmentConfig.yAxis,
                }}
            >
                {department}
            </div>
        </div>
    );
};

export default CardLayout;
