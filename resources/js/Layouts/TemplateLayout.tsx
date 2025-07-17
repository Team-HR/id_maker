import { usePage } from "@inertiajs/react";
import { ChevronDown, LogOut, Settings, Settings2 } from "lucide-react";
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
    const { user } = usePage().props.auth;

    return (
        <div>
            <div className="shadow-sm navbar bg-base-100 justify-between">
                <a className="font-bold btn btn-ghost uppercase text-sm">
                    {title}
                </a>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {user.username} <ChevronDown size={14} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <a className="font-bold gap-4">
                                <Settings size={18} /> Settings
                            </a>
                        </li>
                        <li>
                            <a className="font-bold gap-4 bg-base-200">
                                <LogOut size={18} /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default TemplateLayout;
