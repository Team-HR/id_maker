import React, { useState } from "react";

const OfficeIdtemplate = () => {
    const [firstname, setFirstname] = useState("");

    return (
        <div className="flex">
            <div className="flex flex-col w-full p-4 max-w-4/12">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Firstname"
                        className="w-full input input-lg"
                    />
                    test
                </div>
            </div>
            <div className="flex justify-center w-full p-4 max-w-8/12 bg-stone-400/50">
                <div
                    style={{ width: "3.8in", height: "5.49in" }}
                    className="relative overflow-hidden shadow bg-base-100"
                >
                    <img
                        src="/images/office_id_template.png"
                        alt="id template"
                        className="relative z-10 object-contain w-full h-full"
                    />
                    <img
                        src="/images/test_picture.jpg"
                        alt="pp"
                        className="absolute z-[5] max-w-45"
                        style={{ right: 24, top: 100 }}
                    />
                    <div className="absolute z-20 text-[0.3in] font-semibold uppercase text-base-100 top-78 right-2.5">
                        Kim Harold V.
                    </div>
                    <div className="absolute z-20 text-[0.3in] font-semibold uppercase text-base-100 top-85 right-2.5">
                        Pinanonang
                    </div>
                    <div className="absolute z-20 text-[0.22in] text-base-100 top-110 right-2.5">
                        Office of the Human Resource
                    </div>
                    <div className="absolute z-20 text-[0.22in] text-base-100 top-115 right-2.5">
                        Management and Dev't
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeIdtemplate;
