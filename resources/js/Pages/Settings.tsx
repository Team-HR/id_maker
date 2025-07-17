import WithNavbarLayout from "@/Layouts/WithNavbarLayout";
import React from "react";

const Settings = () => {
    return (
        <WithNavbarLayout
            title="Office Id Template"
            className="p-4 flex flex-col items-center"
        >
            <div className="card w-xl bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Account Settings</h2>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Username</legend>
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
                </div>
            </div>
        </WithNavbarLayout>
    );
};

export default Settings;
