import React, { useEffect, useRef, useState } from "react";
import InputWithSettings from "./InputWithSettings";
import {
    cityOffices,
    officePositions as importedOfficePositions,
} from "@/utils";
import { router, usePage } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";
import { OfficeId } from "@/types/types";
import axios from "axios";
import { useToast } from "@/Context/ToastContext";
import CardLayout from "./CardLayout";
import WithNavbarLayout from "@/Layouts/WithNavbarLayout";

const OfficeIdtemplate = ({ office_ids }: { office_ids: OfficeId[] }) => {
    const { user } = usePage().props.auth;

    const [idToEdit, setIdToEdit] = useState<null | OfficeId>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<OfficeId[]>([]);

    const [firstname, setFirstname] = useState("");
    const [firstnameXAxis, setFirstnameXAxis] = useState(0);
    const [firstnameYAxis, setFirstnameYAxis] = useState(316);
    const [firstnameFontsize, setFirstnameFontsize] = useState(27);

    const [lastname, setLastname] = useState("");
    const [lastnameXAxis, setLastnameXAxis] = useState(0);
    const [lastnameYAxis, setLastnameYAxis] = useState(385);
    const [lastnameFontsize, setLastnameFontsize] = useState(15);

    const [position, setPosition] = useState("");
    const [positionXAxis, setPositionXAxis] = useState(10);
    const [positionYAxis, setPositionYAxis] = useState(367);
    const [positionFontsize, setPositionFontsize] = useState(17);

    const [cityOfficesArray, setCityOfficesArray] = useState(cityOffices);
    const [officeInput, setOfficeInput] = useState("");
    const [officeInputXAxis, setOfficeInputXAxis] = useState(10);
    const [officeInputYAxis, setOfficeInputYAxis] = useState(430);
    const [officeInputFontSize, setOfficeInputFontSize] = useState(15);

    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreviewUrl, setPicturePreviewUrl] = useState<string>("");
    const [pictureXAxis, setPictureXAxis] = useState(-70);
    const [pictureYAxis, setPictureYAxis] = useState(88);
    const [pictureScale, setPictureScale] = useState(350);
    const pictureInputRef = useRef<HTMLInputElement | null>(null);

    // OFFICE IDS FROM PROPS
    const [officeIds, setOfficeIds] = useState<OfficeId[]>(office_ids ?? []);
    const [filteredOfficeIds, setFilteredOfficeIds] = useState<OfficeId[]>([]);

    // OFFICE POSITIONS
    const [officePositions, setOfficePositions] = useState(
        importedOfficePositions ?? []
    );

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
            setIdToEdit(idToEdit);

            setFirstname(idToEdit.firstname);
            setLastname(idToEdit.lastname ?? "");
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
        if (user) {
            setOfficeInputXAxis(
                user.configs.office_id_template?.department?.xAxis ?? 10
            );
            setOfficeInputYAxis(
                user.configs.office_id_template?.department?.yAxis ?? 430
            );
            setOfficeInputFontSize(
                user.configs.office_id_template?.department?.fontSize ?? 20
            );
            setFirstnameXAxis(
                user.configs.office_id_template?.firstname?.xAxis ?? 10
            );
            setFirstnameYAxis(
                user.configs.office_id_template?.firstname?.yAxis ?? 316
            );
            setFirstnameFontsize(
                user.configs.office_id_template?.firstname?.fontSize ?? 27
            );

            setOfficeInput(user.department);
        }
    }, [user]);

    useEffect(() => {
        if (searchQuery) {
            handleSearchFiltering(searchQuery);
        }
    }, [searchQuery]);

    const handleOfficePositionFiltering = (posQuery: string) => {
        if (!posQuery) {
            setOfficePositions(importedOfficePositions);
            return;
        }

        setOfficePositions(
            importedOfficePositions.filter((position) =>
                position.toLowerCase().includes(posQuery.toLowerCase())
            )
        );
    };

    const handleSearchFiltering = async (searchQuery: string) => {
        if (user.roles.includes("sudo_admin")) {
            await axios
                .get(route("office-id.search", { query: searchQuery }))
                .then((res) => setFilteredOfficeIds(res.data));

            return;
        }

        const normalizedQuery = searchQuery.trim().toLowerCase();

        const filteredRecords = office_ids.filter((record) => {
            const first = record.firstname.toLowerCase();
            const last = record.lastname?.toLowerCase() ?? "";

            return (
                first.includes(normalizedQuery) ||
                last.includes(normalizedQuery)
            );
        });

        setFilteredOfficeIds(filteredRecords);
    };

    const handleCityOfficesSearch = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value;
        setOfficeInput(input);

        const filtered = cityOffices.filter((office) =>
            office.toLowerCase().includes(input.toLowerCase())
        );

        setCityOfficesArray(filtered);
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
                .then((res) => {
                    showToast("success", res.data.message);

                    const arrayWithUpdatedDataRemoved = officeIds.filter(
                        (id) => id.id !== res.data.officeId.id
                    );
                    setOfficeIds([
                        ...arrayWithUpdatedDataRemoved,
                        res.data.officeId,
                    ]);
                });
        } else {
            await axios.post(route("office-id.save"), formData).then((res) => {
                showToast("success", res.data.message);
                setIdToEdit(res.data.officeId);
                setOfficeIds((prevIds) => [...prevIds, res.data.officeId]);
            });
        }
    };

    const reset = () => {
        setFirstname("");
        setFirstnameXAxis(
            user.configs.office_id_template?.firstname?.xAxis ?? 10
        );
        setFirstnameYAxis(
            user.configs.office_id_template?.firstname?.yAxis ?? 316
        );
        setFirstnameFontsize(
            user.configs.office_id_template?.firstname?.fontSize ?? 27
        );

        setLastname("");
        setLastnameXAxis(10);
        setLastnameYAxis(340);
        setLastnameFontsize(35);

        setPosition("");
        setPositionXAxis(10);
        setPositionYAxis(367);
        setPositionFontsize(17);
        setOfficePositions(importedOfficePositions);

        setOfficeInput(user.department ?? "");
        setOfficeInputXAxis(
            user.configs.office_id_template?.department?.xAxis ?? 10
        );
        setOfficeInputYAxis(
            user.configs.office_id_template?.department?.yAxis ?? 430
        );
        setOfficeInputFontSize(
            user.configs.office_id_template?.department?.fontSize ?? 20
        );

        setPicture(null);
        setPicturePreviewUrl("");
        setPictureXAxis(-70);
        setPictureYAxis(88);
        setPictureScale(350);
        if (pictureInputRef.current) {
            pictureInputRef.current.value = "";
        }

        setIdToEdit(null);
    };

    return (
        <WithNavbarLayout title="Office Id Template">
            <div className="flex h-[calc(100vh-64px)] items-center">
                <div className="h-full p-8 overflow-auto max-w-4/12">
                    <div className="flex flex-col w-full p-8 rounded-lg shadow-xl bg-base-100">
                        <div className="flex gap-2">
                            <fieldset className="w-full fieldset">
                                <legend className="fieldset-legend">
                                    Fullname
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
                                disabled={!picturePreviewUrl}
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
                                    onChange={(e) => {
                                        setPosition(e.target.value);
                                        handleOfficePositionFiltering(
                                            e.target.value
                                        );
                                    }}
                                />
                            </InputWithSettings>
                        </fieldset>

                        <div className="overflow-auto border max-h-36 rounded-box border-base-content/5 bg-base-100">
                            <table className="table">
                                <tbody>
                                    {officePositions.map((position, index) => (
                                        <tr
                                            key={index}
                                            className="cursor-pointer hover:bg-base-300"
                                            onClick={() => {
                                                setPosition(position);
                                                setOfficePositions([]);
                                            }}
                                        >
                                            <th>{position}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                    onChange={(e) => {
                                        handleCityOfficesSearch(e);
                                    }}
                                />
                            </InputWithSettings>
                        </fieldset>
                        {user.roles.includes("sudo_admin") && (
                            <div className="overflow-auto border max-h-36 rounded-box border-base-content/5 bg-base-100">
                                <table className="table">
                                    <tbody>
                                        {cityOfficesArray.map(
                                            (office, index) => (
                                                <tr
                                                    key={index}
                                                    className="cursor-pointer hover:bg-base-300"
                                                    onClick={() => {
                                                        setOfficeInput(office);
                                                        setCityOfficesArray([]);
                                                    }}
                                                >
                                                    <th>{office}</th>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="divider"></div>
                        <button
                            className={`btn btn-sm ${
                                idToEdit ? "btn-secondary" : "btn-primary"
                            }`}
                            onClick={() => handleSave()}
                            disabled={!picturePreviewUrl || !officeInput}
                        >
                            {idToEdit ? "Update" : "Save"}
                        </button>
                        <button
                            className="btn btn-sm btn-primary btn-ghost"
                            onClick={async () => {
                                await setIsPrinting(true);
                                reactToPrintFn();
                            }}
                            disabled={!picturePreviewUrl || !officeInput}
                        >
                            Print
                        </button>
                        <button
                            className="btn btn-sm btn-primary btn-ghost"
                            onClick={reset}
                        >
                            Reset / New
                        </button>
                    </div>
                </div>

                <div className="relative flex items-center justify-center w-full h-full p-4 max-w-4/12 bg-stone-400/50">
                    <CardLayout
                        firstname={firstname}
                        firstnameConfig={{
                            xAxis: firstnameXAxis,
                            yAxis: firstnameYAxis,
                            fontSize: firstnameFontsize,
                        }}
                        lastname={lastname}
                        lastnameConfig={{
                            xAxis: lastnameXAxis,
                            yAxis: lastnameYAxis,
                            fontSize: lastnameFontsize,
                        }}
                        position={position}
                        positionConfig={{
                            xAxis: positionXAxis,
                            yAxis: positionYAxis,
                            fontSize: positionFontsize,
                        }}
                        department={officeInput}
                        departmentConfig={{
                            xAxis: officeInputXAxis,
                            yAxis: officeInputYAxis,
                            fontSize: officeInputFontSize,
                        }}
                        picturePreviewUrl={picturePreviewUrl}
                        picturePreviewConfig={{
                            xAxis: pictureXAxis,
                            yAxis: pictureYAxis,
                            scale: pictureScale,
                        }}
                    />
                </div>
                <div className="w-full h-full p-8 max-w-4/12">
                    <div className="p-8 shadow-lg bg-base-100">
                        <fieldset className="w-full fieldset">
                            <legend className="fieldset-legend">Search</legend>
                            <input
                                type="text"
                                className="w-full input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="overflow-auto max-h-96 rounded-box bg-base-200">
                                <table className="table table-sm">
                                    <tbody>
                                        {searchQuery === ""
                                            ? officeIds.map(
                                                  (office_id, index) => (
                                                      <tr
                                                          key={index}
                                                          className="cursor-pointer hover:bg-base-200"
                                                      >
                                                          <th className="uppercase">
                                                              {office_id.firstname +
                                                                  (office_id.lastname
                                                                      ? " " +
                                                                        office_id.lastname
                                                                      : "")}
                                                          </th>
                                                          <th className="uppercase text-end">
                                                              <button
                                                                  className="btn btn-primary btn-sm"
                                                                  onClick={async () => {
                                                                      await reset();
                                                                      await setIdToEdit(
                                                                          office_id
                                                                      );
                                                                  }}
                                                              >
                                                                  View
                                                              </button>
                                                          </th>
                                                      </tr>
                                                  )
                                              )
                                            : filteredOfficeIds.map(
                                                  (office_id, index) => (
                                                      <tr
                                                          key={index}
                                                          className="cursor-pointer hover:bg-base-200"
                                                      >
                                                          <th className="uppercase">
                                                              {office_id.firstname +
                                                                  (office_id.lastname
                                                                      ? " " +
                                                                        office_id.lastname
                                                                      : "")}
                                                          </th>
                                                          <th className="uppercase text-end">
                                                              <button
                                                                  className="btn btn-primary btn-sm"
                                                                  onClick={async () => {
                                                                      await reset();
                                                                      setIdToEdit(
                                                                          office_id
                                                                      );
                                                                  }}
                                                              >
                                                                  View
                                                              </button>
                                                          </th>
                                                      </tr>
                                                  )
                                              )}
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isPrinting ? "flex" : "hidden"
                } absolute w-full justify-center`}
                ref={contentRef}
            >
                <CardLayout
                    className="border-t-2 border-b border-l-2 border-r border-primary"
                    firstname={firstname}
                    firstnameConfig={{
                        xAxis: firstnameXAxis,
                        yAxis: firstnameYAxis,
                        fontSize: firstnameFontsize,
                    }}
                    lastname={lastname}
                    lastnameConfig={{
                        xAxis: lastnameXAxis,
                        yAxis: lastnameYAxis,
                        fontSize: lastnameFontsize,
                    }}
                    position={position}
                    positionConfig={{
                        xAxis: positionXAxis,
                        yAxis: positionYAxis,
                        fontSize: positionFontsize,
                    }}
                    department={officeInput}
                    departmentConfig={{
                        xAxis: officeInputXAxis,
                        yAxis: officeInputYAxis,
                        fontSize: officeInputFontSize,
                    }}
                    picturePreviewUrl={picturePreviewUrl}
                    picturePreviewConfig={{
                        xAxis: pictureXAxis,
                        yAxis: pictureYAxis,
                        scale: pictureScale,
                    }}
                />
                <CardLayout
                    className="border-t-2 border-b border-r border-primary"
                    firstname={firstname}
                    firstnameConfig={{
                        xAxis: firstnameXAxis,
                        yAxis: firstnameYAxis,
                        fontSize: firstnameFontsize,
                    }}
                    lastname={lastname}
                    lastnameConfig={{
                        xAxis: lastnameXAxis,
                        yAxis: lastnameYAxis,
                        fontSize: lastnameFontsize,
                    }}
                    position={position}
                    positionConfig={{
                        xAxis: positionXAxis,
                        yAxis: positionYAxis,
                        fontSize: positionFontsize,
                    }}
                    department={officeInput}
                    departmentConfig={{
                        xAxis: officeInputXAxis,
                        yAxis: officeInputYAxis,
                        fontSize: officeInputFontSize,
                    }}
                    picturePreviewUrl={picturePreviewUrl}
                    picturePreviewConfig={{
                        xAxis: pictureXAxis,
                        yAxis: pictureYAxis,
                        scale: pictureScale,
                    }}
                />
            </div>
        </WithNavbarLayout>
    );
};

export default OfficeIdtemplate;
