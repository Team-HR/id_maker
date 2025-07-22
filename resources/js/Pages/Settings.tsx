import { useToast } from "@/Context/ToastContext";
import WithNavbarLayout from "@/Layouts/WithNavbarLayout";
import { User } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
    auth: { user: User };
    errors: {
        new_username?: string;
        current_password?: string;
        new_password?: string;
    };
}

const Settings = ({ auth, errors }: Props) => {
    const { user } = auth;
    const { showToast } = useToast();

    const [username, setUsername] = useState(user.username);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [usernameError, setUsernameError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");

    const handleUsernameSave = async () => {
        await router.patch(
            route("username.update", { new_username: username }),
            {},
            {
                onSuccess: () => {
                    setIsEditingUsername(false);
                    showToast("success", "Username updated successfully");
                },
            }
        );
    };

    const handlePasswordSave = async () => {
        await router.patch(
            route("password.update", {
                current_password: currentPassword,
                new_password: newPassword,
            }),
            {},
            {
                onSuccess: () => {
                    setIsEditingPassword(false);
                    showToast("success", "Password updated successfully");
                },
            }
        );
    };

    useEffect(() => {
        if (errors) {
            setUsernameError(errors?.new_username ?? "");
            setPasswordError(errors?.current_password ?? "");
            setNewPasswordError(errors?.new_password ?? "");
        }
    }, [errors]);

    return (
        <WithNavbarLayout
            title="Office Id Template"
            className="flex flex-col items-center p-4"
        >
            <div className="flex items-center gap-2 mb-2 w-xl">
                <Link href={route("dashboard")} className="btn btn-sm">
                    <ArrowLeft size={18} />
                </Link>
                <span className="text-sm">Back to Dashboard</span>
            </div>
            <div className="shadow-sm card w-xl bg-base-100 card-md">
                <div className="card-body">
                    <legend className="text-lg font-bold">
                        Account Settings
                    </legend>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username</legend>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="w-full input"
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
                            <input
                                type="password"
                                className="w-full input"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                disabled={!isEditingPassword}
                            />

                            <div className="flex gap-0.5">
                                <button
                                    className={`btn ${
                                        isEditingPassword
                                            ? "btn-error"
                                            : "btn-neutral"
                                    }`}
                                    onClick={() => {
                                        setIsEditingPassword(
                                            !isEditingPassword
                                        );
                                        setCurrentPassword("");
                                        setNewPassword("");
                                        setConfirmNewPassword("");
                                        setPasswordError("");
                                        setNewPasswordError("");
                                    }}
                                >
                                    {isEditingPassword ? "Cancel" : "Edit"}
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        handlePasswordSave();
                                    }}
                                    disabled={
                                        !newPassword ||
                                        !confirmNewPassword ||
                                        !currentPassword ||
                                        newPassword !== confirmNewPassword ||
                                        !isEditingPassword
                                    }
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        {passwordError && (
                            <p className="label text-error">{passwordError}</p>
                        )}
                    </fieldset>
                    {isEditingPassword && (
                        <div className="flex w-full gap-4">
                            <fieldset className="w-full fieldset">
                                <legend className="fieldset-legend">
                                    New Password
                                </legend>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        className="w-full input"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>
                                {newPasswordError && (
                                    <p className="label text-error">
                                        {newPasswordError}
                                    </p>
                                )}
                            </fieldset>
                            <fieldset className="w-full fieldset">
                                <legend className="fieldset-legend">
                                    Confirm New Password
                                </legend>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        className="w-full input"
                                        value={confirmNewPassword}
                                        onChange={(e) =>
                                            setConfirmNewPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                {newPassword !== confirmNewPassword && (
                                    <p className="label text-error">
                                        Must match new password
                                    </p>
                                )}
                            </fieldset>
                        </div>
                    )}
                </div>
            </div>
        </WithNavbarLayout>
    );
};

export default Settings;
