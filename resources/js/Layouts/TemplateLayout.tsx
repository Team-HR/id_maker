import React, { ReactNode } from "react";

const TemplateLayout = ({
    children,
    title,
    className,
}: {
    children: ReactNode;
    title: string;
    className?: string;
}) => {
    return (
        <div>
            <div className="shadow-sm navbar bg-base-100">
                <a className="text-xl btn btn-ghost">{title}</a>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default TemplateLayout;
