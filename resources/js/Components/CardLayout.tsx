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
            style={{ width: "3.79in", height: "5.42in" }}
            className={`relative overflow-hidden shadow bg-base-100 ${className}`}
        >
            <img
                src="/images/new_office_id_template.png"
                alt="id template"
                className="relative z-10 object-contain w-full h-full pointer-events-none "
            />
            <img
                src={picturePreviewUrl}
                alt="pp"
                className="absolute z-[5] object-contain"
                style={{
                    right: picturePreviewConfig.xAxis,
                    top: picturePreviewConfig.yAxis,
                    width: picturePreviewConfig.scale,
                    height: "auto", // preserve aspect ratio
                    maxWidth: "none",
                    maxHeight: "none",
                }}
            />

            <div
                className="absolute left-0 z-20 w-full font-semibold text-center uppercase text-base-100 font-montserrat-bold"
                style={{
                    fontSize: firstnameConfig.fontSize,
                    right: firstnameConfig.xAxis,
                    top: firstnameConfig.yAxis,
                }}
            >
                {firstname}
            </div>
            {/* <div
                className="absolute z-20 font-semibold uppercase text-base-100"
                style={{
                    fontSize: lastnameConfig.fontSize,
                    right: lastnameConfig.xAxis,
                    top: lastnameConfig.yAxis,
                }}
            >
                {lastname}
            </div> */}
            <div
                className="absolute left-0 z-20 w-full font-serif text-center uppercase font-montserrat-medium text-base-100"
                style={{
                    fontSize: positionConfig?.fontSize,
                    right: positionConfig?.xAxis,
                    top: positionConfig?.yAxis,
                }}
            >
                {position}
            </div>
            <div
                className="absolute z-20 leading-5 uppercase max-w-80 text-end text-base-100 font-barabara"
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
