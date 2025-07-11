import React, { useEffect, useRef, useState } from "react";
import InputWithSettings from "./InputWithSettings";
import { cityOffices } from "@/utils";
import TemplateLayout from "@/Layouts/TemplateLayout";
import { router } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import { OfficeId } from "@/types/types";
import axios from "axios";
import { useToast } from "@/Context/ToastContext";

const OfficeIdtemplate = () => {
    const [idToEdit, setIdToEdit] = useState<null | OfficeId>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<OfficeId[]>([]);

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
    const pictureInputRef = useRef<HTMLInputElement | null>(null);

    // FOR PRINTING HERE
    const [isPrinting, setIsPrinting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        onAfterPrint: () => {
            setIsPrinting(false);
            handleSave();
        },
    });

    const { showToast } = useToast();

    useEffect(() => {
        if (idToEdit) {
            setFirstname(idToEdit.firstname);
            setLastname(idToEdit.lastname);
            setPosition(idToEdit.position ?? "");
            setOfficeInput(idToEdit.department);
            setPicturePreviewUrl("storage/" + idToEdit?.picture);

            // Parse configs
            let configs: OfficeId["configs"];
            try {
                configs =
                    typeof idToEdit.configs === "string"
                        ? JSON.parse(idToEdit.configs)
                        : idToEdit.configs;
            } catch (error) {
                console.error("Failed to parse configs:", error);
                configs = idToEdit.configs;
            }

            if (configs.firstname) {
                setFirstnameXAxis(configs.firstname.xAxis);
                setFirstnameYAxis(configs.firstname.yAxis);
                setFirstnameFontsize(configs.firstname.fontSize);
            }

            if (configs.lastname) {
                setLastnameXAxis(configs.lastname.xAxis);
                setLastnameYAxis(configs.lastname.yAxis);
                setLastnameFontsize(configs.lastname.fontSize);
            }

            if (configs.position) {
                setPositionXAxis(configs.position.xAxis);
                setPositionYAxis(configs.position.yAxis);
                setPositionFontsize(configs.position.fontSize);
            }

            if (configs.department) {
                setOfficeInputXAxis(configs.department.xAxis);
                setOfficeInputYAxis(configs.department.yAxis);
                setOfficeInputFontSize(configs.department.fontSize);
            }

            if (configs.picture) {
                setPictureXAxis(configs.picture.xAxis);
                setPictureYAxis(configs.picture.yAxis);
                setPictureScale(configs.picture.scale);
            }
        }
    }, [idToEdit]);

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    const handleSearch = async (searchQuery: string) => {
        await axios
            .get(route("office-id.search"), {
                params: {
                    query: searchQuery,
                },
            })
            .then((res) => {
                setSearchResult(res.data);
                console.log(res.data);
            });
    };

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

    const handleSave = async () => {
        const data = {
            firstname: {
                xAxis: firstnameXAxis,
                yAxis: firstnameYAxis,
                fontSize: firstnameFontsize,
            },
            lastname: {
                xAxis: lastnameXAxis,
                yAxis: lastnameYAxis,
                fontSize: lastnameFontsize,
            },
            position: {
                xAxis: positionXAxis,
                yAxis: positionYAxis,
                fontSize: positionFontsize,
            },
            department: {
                xAxis: officeInputXAxis,
                yAxis: officeInputYAxis,
                fontSize: officeInputFontSize,
            },
            picture: {
                scale: pictureScale,
                xAxis: pictureXAxis,
                yAxis: pictureYAxis,
            },
        };

        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("position", position);
        formData.append("department", officeInput);
        formData.append("configs", JSON.stringify(data));

        if (picture) {
            formData.append("picture", picture);
        }

        if (idToEdit) {
            await axios
                .post(route("office-id.patch", { id: idToEdit.id }), formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => showToast("success", res.data.message));
        } else {
            await axios
                .post(route("office-id.save"), formData)
                .then((res) => showToast("success", res.data.message));
        }
    };

    const reset = () => {
        setFirstname("");
        setFirstnameXAxis(10);
        setFirstnameYAxis(310);
        setFirstnameFontsize(30);

        setLastname("");
        setLastnameXAxis(10);
        setLastnameYAxis(340);
        setLastnameFontsize(30);

        setPosition("");
        setPositionXAxis(10);
        setPositionYAxis(385);
        setPositionFontsize(20);

        setOfficeInput("");
        setOfficeInputXAxis(10);
        setOfficeInputYAxis(445);
        setOfficeInputFontSize(21);
        setFilteredOffices(cityOffices);

        setPicture(null);
        setPicturePreviewUrl("");
        setPictureXAxis(15);
        setPictureYAxis(100);
        setPictureScale(200);
        if (pictureInputRef.current) {
            pictureInputRef.current.value = "";
        }

        setIdToEdit(null);
    };

    const cardLayout = (
        <div
            style={{ width: "3.79in", height: "5.48in" }}
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
                className="absolute z-20 font-serif text-neutral"
                style={{
                    fontSize: positionFontsize,
                    right: positionXAxis,
                    top: positionYAxis,
                }}
            >
                {position}
            </div>
            <div
                className="absolute z-20 leading-5 max-w-80 text-end text-base-100"
                style={{
                    fontSize: officeInputFontSize,
                    right: officeInputXAxis,
                    top: officeInputYAxis,
                }}
            >
                {officeInput}
            </div>
        </div>
    );

    return (
        <TemplateLayout title="Office Id Template">
            <div className="flex h-[calc(100vh-64px)] items-center">
                <div className="h-full p-8 overflow-auto max-w-4/12">
                    <div className="flex flex-col w-full p-8 rounded-lg shadow-xl bg-base-100">
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend">Search</legend>
                            <input
                                type="text"
                                className="w-full input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchResult.length > 0 && (
                                <div className="mt-1 overflow-x-auto border max-h-32 rounded-box border-base-content/5 bg-base-100">
                                    <table className="table table-sm">
                                        <tbody>
                                            {searchResult.map(
                                                (result, index) => (
                                                    <tr
                                                        key={index}
                                                        className="cursor-pointer hover:bg-base-200"
                                                        onClick={() => {
                                                            setIdToEdit(result);
                                                            setSearchResult([]);
                                                        }}
                                                    >
                                                        <th>
                                                            {result.firstname +
                                                                " " +
                                                                result.lastname}
                                                        </th>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </fieldset>
                        <div className="divider"></div>
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
                                    ref={pictureInputRef}
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
                                    <div className="mt-1 overflow-x-auto border max-h-32 rounded-box border-base-content/5 bg-base-100">
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
                        <button
                            className={`btn btn-sm ${
                                idToEdit ? "btn-secondary" : "btn-primary"
                            }`}
                            onClick={() => handleSave()}
                            disabled={
                                !firstname ||
                                !lastname ||
                                !picturePreviewUrl ||
                                !officeInput
                            }
                        >
                            {idToEdit ? "Update" : "Save"}
                        </button>
                        <button
                            className="btn btn-sm btn-primary btn-ghost"
                            onClick={async () => {
                                await setIsPrinting(true);
                                reactToPrintFn();
                            }}
                            disabled={
                                !firstname ||
                                !lastname ||
                                !picturePreviewUrl ||
                                !officeInput
                            }
                        >
                            Print
                        </button>
                        <button
                            className="btn btn-sm btn-primary btn-ghost"
                            onClick={reset}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-full p-4 max-w-8/12 bg-stone-400/50">
                    {cardLayout}
                </div>
            </div>
            <div
                className={`${
                    isPrinting ? "flex" : "hidden"
                } absolute w-full justify-center `}
                ref={contentRef}
            >
                {cardLayout}
                {cardLayout}
            </div>
        </TemplateLayout>
    );
};

export default OfficeIdtemplate;
