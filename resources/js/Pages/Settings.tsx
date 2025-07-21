import { useToast } from "@/Context/ToastContext";
import WithNavbarLayout from "@/Layouts/WithNavbarLayout";
import { User } from "@/types";
import { router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

interface Props {
    auth: { user: User };
    errors: { new_username?: string };
}

const Settings = ({ auth, errors }: Props) => {
    const { user } = auth;
    const { showToast } = useToast();

    const [username, setUsername] = useState(user.username);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [usernameError, setUsernameError] = useState("");

    const handleUsernameSave = async () => {
        await router.patch(
            route("username.update", { new_username: username }),
            {},
            {
                onSuccess: () => {
                    setIsEditingUsername(false);
                    showToast("success", "Username updated successfully");
                },
                onError: (errors) => {
                    setUsernameError(
                        errors.new_username || "Failed to update username"
                    );
                },
            }
        );
    };

    const clearErrors = () => {
        setUsername("");
    };

    useEffect(() => {
        if (errors) {
            setUsernameError(errors?.new_username ?? "");
        }
    }, [errors]);

    return (
        <WithNavbarLayout
            title="Office Id Template"
            className="p-4 flex flex-col items-center"
        >
            <div className="card w-xl bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <legend className="text-lg font-bold">
                        Account Settings
                    </legend>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username</legend>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="input w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={!isEditingUsername}
                            />
                            <div className="flex gap-0.5">
                                <button
                                    className={`btn ${
                                        isEditingUsername
                                            ? "btn-error"
                                            : "btn-neutral"
                                    }`}
                                    onClick={() => {
                                        isEditingUsername &&
                                            setUsername(user.username);
                                        setIsEditingUsername(
                                            !isEditingUsername
                                        );
                                        setUsernameError("");
                                    }}
                                >
                                    {isEditingUsername ? "Cancel" : "Edit"}
                                </button>
                                <button
                                    className="btn btn-success"
                                    disabled={username === user.username}
                                    onClick={() => handleUsernameSave()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        {usernameError && (
                            <p className="label text-error">{usernameError}</p>
                        )}
                    </fieldset>
                    <div className="divider"></div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <div className="flex gap-2">
                            <input type="text" className="input w-full" />
                            <div className="flex gap-0.5">
                                <button className="btn btn-neutral">
                                    Edit
                                </button>
                                <button className="btn btn-success">
                                    Save
                                </button>
                            </div>
                        </div>
                        {/* <p className="label">Optional</p> */}
                    </fieldset>
                    <div className="flex w-full gap-4">
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">
                                New Password
                            </legend>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    className="input w-full"
                                />
                            </div>
                            {/* <p className="label">Optional</p> */}
                        </fieldset>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">
                                Confirm New Password
                            </legend>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    className="input w-full"
                                />
                            </div>
                            {/* <p className="label">Optional</p> */}
                        </fieldset>
                    </div>
                </div>
            </div>
        </WithNavbarLayout>
    );
};

export default Settings;
