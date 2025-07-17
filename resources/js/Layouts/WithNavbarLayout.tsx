import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, LogOut, Settings, Settings2 } from "lucide-react";
import React, { ReactNode } from "react";

const WithNavbarLayout = ({
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
                <Link
                    href={route("dashboard")}
                    className="font-bold btn btn-ghost uppercase text-sm"
                >
                    {title}
                </Link>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {user.username} <ChevronDown size={14} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <Link
                                href={route("settings")}
                                className="font-bold gap-4"
                            >
                                <Settings size={18} /> Settings
                            </Link>
                        </li>

                        <li>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button
                                className="font-bold gap-4 bg-base-200"
                                onClick={() => {
                                    const modal = document.getElementById(
                                        "my_modal_2"
                                    ) as HTMLDialogElement | null;
                                    modal?.showModal();
                                }}
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={className}>{children}</div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Logout?</h3>
                    <p className="py-4">Are you sure you want to logout ?</p>
                    <div className="flex justify-end gap-0.5">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                        <Link
                            href={route("logout")}
                            className="btn btn-primary"
                        >
                            Confirm
                        </Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default WithNavbarLayout;
