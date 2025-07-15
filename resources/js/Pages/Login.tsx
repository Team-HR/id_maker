import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Login = ({ errors }: { errors: { [key: string]: string[] } }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<null | { [key: string]: string[] }>(
        null
    );

    useEffect(() => {
        if (errors) {
            setError(errors);
            setPassword("");
        }
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await router.post(route("login.post", { username, password }));
    };

    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="flex flex-col items-center">
                <div className="w-full max-w-sm shadow-2xl mt-36 card bg-base-100 shrink-0">
                    <div className="card-body">
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="fieldset"
                        >
                            <label className="label">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full input ${
                                    error?.username && "input-error"
                                }`}
                                required
                            />
                            <label className="label">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className={`w-full input ${
                                    error?.username && "input-error"
                                }`}
                                required
                            />
                            {error?.username && (
                                <div className="py-2 my-2 text-center text-error bg-error/20">
                                    {error.username}
                                </div>
                            )}
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <footer className="items-center p-4 footer sm:footer-horizontal bg-primary text-neutral-content">
                <aside className="items-center grid-flow-col">
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved
                    </p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    {/* Social Icons */}
                    {/* ... keep these SVG icons ... */}
                </nav>
            </footer>
        </div>
    );
};

export default Login;
