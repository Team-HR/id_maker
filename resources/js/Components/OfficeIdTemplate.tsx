import { Settings2 } from "lucide-react";
import React, { useState } from "react";
import InputWithSettings from "./InputWithSettings";

const OfficeIdtemplate = () => {
    const [firstname, setFirstname] = useState("");
    const [firstnameXAxis, setFirstnameXAxis] = useState(10);
    const [firstnameYAxis, setFirstnameYAxis] = useState(310);
    const [firstnameFontsize, setFirstnameFontsize] = useState(30);

    const [lastname, setLastname] = useState("");
    const [lastnameXAxis, setLastnameXAxis] = useState(10);
    const [lastnameYAxis, setLastnameYAxis] = useState(340);
    const [lastnameFontsize, setLastnameFontsize] = useState(30);

    return (
        <div className="flex">
            <div className="flex flex-col w-full gap-2 p-4 max-w-4/12">
                <InputWithSettings
                    placeholder="Firstname"
                    inputValue={firstname}
                    setInputValue={setFirstname}
                    xAxis={firstnameXAxis}
                    setXAxis={setFirstnameXAxis}
                    yAxis={firstnameYAxis}
                    setYAxis={setFirstnameYAxis}
                    fontSize={firstnameFontsize}
                    setFontSize={setFirstnameFontsize}
                />
                <InputWithSettings
                    placeholder="Lastname"
                    inputValue={lastname}
                    setInputValue={setLastname}
                    xAxis={firstnameXAxis}
                    setXAxis={setLastnameXAxis}
                    yAxis={lastnameYAxis}
                    setYAxis={setLastnameYAxis}
                    fontSize={lastnameFontsize}
                    setFontSize={setLastnameFontsize}
                />
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
                    <div
                        className="absolute z-20 font-semibold uppercase text-base-100 "
                        style={{
                            fontSize: firstnameFontsize,
                            right: firstnameXAxis,
                            top: firstnameYAxis,
                        }}
                    >
                        {firstname}
                    </div>
                    <div
                        className="absolute z-20 font-semibold uppercase text-base-100 "
                        style={{
                            fontSize: lastnameFontsize,
                            right: lastnameXAxis,
                            top: lastnameYAxis,
                        }}
                    >
                        {lastname}
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
