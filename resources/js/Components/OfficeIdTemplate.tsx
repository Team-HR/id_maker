import { Settings2 } from "lucide-react";
import React, { useState } from "react";
import InputWithSettings from "./InputWithSettings";
import { cityOffices } from "@/utils";
import OfficeSearchWithSettings from "./OfficeSearchWithSettings";

const OfficeIdtemplate = () => {
    const [firstname, setFirstname] = useState("");
    const [firstnameXAxis, setFirstnameXAxis] = useState(10);
    const [firstnameYAxis, setFirstnameYAxis] = useState(310);
    const [firstnameFontsize, setFirstnameFontsize] = useState(30);

    const [lastname, setLastname] = useState("");
    const [lastnameXAxis, setLastnameXAxis] = useState(10);
    const [lastnameYAxis, setLastnameYAxis] = useState(340);
    const [lastnameFontsize, setLastnameFontsize] = useState(30);

    const [officeInput, setOfficeInput] = useState("");
    const [officeInputXAxis, setOfficeInputXAxis] = useState(10);
    const [officeInputYAxis, setOfficeInputYAxis] = useState(445);
    const [officeInputFontSize, setOfficeInputFontSize] = useState(21);
    const [filteredOffices, setFilteredOffices] = useState(cityOffices);

    const handleOfficeInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setOfficeInput(value);

        const filtered = cityOffices.filter((office) =>
            office.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOffices(filtered);
    };

    const handleOfficeClick = (office: string) => {
        setOfficeInput(office);
        setFilteredOffices([]); // optionally hide suggestions after selection
    };

    return (
        <div className="flex">
            <div className="flex flex-col w-full gap-2 p-4 max-w-4/12">
                <div className="flex gap-2">
                    <fieldset className="w-full fieldset">
                        <legend className="fieldset-legend">Firstname</legend>
                        <InputWithSettings
                            xAxis={firstnameXAxis}
                            setXAxis={setFirstnameXAxis}
                            yAxis={firstnameYAxis}
                            setYAxis={setFirstnameYAxis}
                            fontSize={firstnameFontsize}
                            setFontSize={setFirstnameFontsize}
                            disabled={!firstname}
                        >
                            <input
                                type="text"
                                className="w-full input"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </InputWithSettings>
                    </fieldset>
                    <fieldset className="w-full fieldset">
                        <legend className="fieldset-legend">Lastname</legend>
                        <InputWithSettings
                            xAxis={lastnameXAxis}
                            setXAxis={setLastnameXAxis}
                            yAxis={lastnameYAxis}
                            setYAxis={setLastnameYAxis}
                            fontSize={lastnameFontsize}
                            setFontSize={setLastnameFontsize}
                            disabled={!lastname}
                        >
                            <input
                                type="text"
                                className="w-full input"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </InputWithSettings>
                    </fieldset>
                </div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        Office / Department
                    </legend>
                    <InputWithSettings
                        disabled={!officeInput}
                        xAxis={officeInputXAxis}
                        setXAxis={setOfficeInputXAxis}
                        yAxis={officeInputYAxis}
                        setYAxis={setOfficeInputYAxis}
                        fontSize={officeInputFontSize}
                        setFontSize={setOfficeInputFontSize}
                    >
                        <input
                            type="text"
                            className="w-full input"
                            value={officeInput}
                            onChange={handleOfficeInputChange}
                            placeholder="Search or select an office"
                        />
                    </InputWithSettings>
                    {officeInput.trim() !== "" &&
                        filteredOffices.length > 0 && (
                            <div className="mt-1 overflow-x-auto border max-h-56 rounded-box border-base-content/5 bg-base-100">
                                <table className="table table-sm">
                                    <tbody>
                                        {filteredOffices.map(
                                            (office, index) => (
                                                <tr
                                                    key={index}
                                                    className="cursor-pointer hover:bg-base-200"
                                                    onClick={() =>
                                                        handleOfficeClick(
                                                            office
                                                        )
                                                    }
                                                >
                                                    <th>{office}</th>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </fieldset>
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
                        className="absolute z-20 font-semibold uppercase text-base-100"
                        style={{
                            fontSize: firstnameFontsize,
                            right: firstnameXAxis,
                            top: firstnameYAxis,
                        }}
                    >
                        {firstname}
                    </div>
                    <div
                        className="absolute z-20 font-semibold uppercase text-base-100"
                        style={{
                            fontSize: lastnameFontsize,
                            right: lastnameXAxis,
                            top: lastnameYAxis,
                        }}
                    >
                        {lastname}
                    </div>
                    <div
                        className="absolute z-20 leading-5 text-end text-base-100"
                        style={{
                            fontSize: officeInputFontSize,
                            right: officeInputXAxis,
                            top: officeInputYAxis,
                        }}
                    >
                        {officeInput}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeIdtemplate;
