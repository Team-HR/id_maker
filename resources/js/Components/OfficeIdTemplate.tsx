import { Settings2 } from "lucide-react";
import React, { useState } from "react";
import InputWithSettings from "./InputWithSettings";
import { cityOffices } from "@/utils";
import TemplateLayout from "@/Layouts/TemplateLayout";

const OfficeIdtemplate = () => {
    const [firstname, setFirstname] = useState("");
    const [firstnameXAxis, setFirstnameXAxis] = useState(10);
    const [firstnameYAxis, setFirstnameYAxis] = useState(310);
    const [firstnameFontsize, setFirstnameFontsize] = useState(30);

    const [lastname, setLastname] = useState("");
    const [lastnameXAxis, setLastnameXAxis] = useState(10);
    const [lastnameYAxis, setLastnameYAxis] = useState(340);
    const [lastnameFontsize, setLastnameFontsize] = useState(30);

    const [position, setPosition] = useState("");
    const [positionXAxis, setPositionXAxis] = useState(10);
    const [positionYAxis, setPositionYAxis] = useState(385);
    const [positionFontsize, setPositionFontsize] = useState(20);

    const [officeInput, setOfficeInput] = useState("");
    const [officeInputXAxis, setOfficeInputXAxis] = useState(10);
    const [officeInputYAxis, setOfficeInputYAxis] = useState(445);
    const [officeInputFontSize, setOfficeInputFontSize] = useState(21);
    const [filteredOffices, setFilteredOffices] = useState(cityOffices);

    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreviewUrl, setPicturePreviewUrl] = useState<string>("");
    const [pictureXAxis, setPictureXAxis] = useState(15);
    const [pictureYAxis, setPictureYAxis] = useState(100);
    const [pictureScale, setPictureScale] = useState(200);

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
        <TemplateLayout title="Office Id Template">
            <div className="flex h-fit">
                <div className="p-8 max-w-4/12">
                    <div className="flex flex-col w-full gap-2 p-8 rounded-lg shadow-xl bg-base-100">
                        <div className="flex gap-2">
                            <fieldset className="w-full fieldset">
                                <legend className="fieldset-legend">
                                    Firstname
                                </legend>
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
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                    />
                                </InputWithSettings>
                            </fieldset>
                            <fieldset className="w-full fieldset">
                                <legend className="fieldset-legend">
                                    Lastname
                                </legend>
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
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                    />
                                </InputWithSettings>
                            </fieldset>
                        </div>

                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend">
                                Upload Picture
                            </legend>
                            <InputWithSettings
                                xAxis={pictureXAxis}
                                setXAxis={setPictureXAxis}
                                yAxis={pictureYAxis}
                                setYAxis={setPictureYAxis}
                                scale={pictureScale}
                                setScale={setPictureScale}
                                disabled={!picture}
                            >
                                <input
                                    type="file"
                                    className="w-full file-input"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPicture(file);
                                            setPicturePreviewUrl(
                                                URL.createObjectURL(file)
                                            );
                                        }
                                    }}
                                />
                            </InputWithSettings>
                        </fieldset>

                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend">
                                Position
                            </legend>
                            <InputWithSettings
                                xAxis={positionXAxis}
                                setXAxis={setPositionXAxis}
                                yAxis={positionYAxis}
                                setYAxis={setPositionYAxis}
                                fontSize={positionFontsize}
                                setFontSize={setPositionFontsize}
                                disabled={!position}
                            >
                                <input
                                    type="text"
                                    className="w-full input"
                                    value={position}
                                    onChange={(e) =>
                                        setPosition(e.target.value)
                                    }
                                />
                            </InputWithSettings>
                        </fieldset>

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
                        <div className="divider"></div>
                        <button className="btn btn-primary">Save</button>
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
                            src={picturePreviewUrl}
                            alt="pp"
                            className="absolute z-[5] object-cover"
                            style={{
                                right: pictureXAxis,
                                top: pictureYAxis,
                                width: pictureScale,
                            }}
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
                            className="absolute z-20 font-serif text-neutral "
                            style={{
                                fontSize: positionFontsize,
                                right: positionXAxis,
                                top: positionYAxis,
                            }}
                        >
                            {position}
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
            <div className="w-full p-4 text-4xl italic font-bold text-center uppercase shadow bg-base-100">
                Printing
            </div>
        </TemplateLayout>
    );
};

export default OfficeIdtemplate;
