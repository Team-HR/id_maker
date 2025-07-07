import { cityOffices } from "@/utils";
import { Settings2 } from "lucide-react";
import React, { useState } from "react";

interface Props {
    disabled?: boolean;
    officeInput: string;
    setOfficeInput: React.Dispatch<React.SetStateAction<string>>;
    xAxis: number;
    setXAxis: React.Dispatch<React.SetStateAction<number>>;
    yAxis: number;
    setYAxis: React.Dispatch<React.SetStateAction<number>>;
    fontSize?: number;
    setFontSize?: React.Dispatch<React.SetStateAction<number>>;
}

const OfficeSearchWithSettings = ({
    xAxis,
    setXAxis,
    yAxis,
    setYAxis,
    fontSize,
    setFontSize,
    officeInput,
    setOfficeInput,
    disabled,
}: Props) => {
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
        <>
            <div className="join">
                <input
                    type="text"
                    className="w-full input"
                    value={officeInput}
                    onChange={handleOfficeInputChange}
                    placeholder="Search or select an office"
                />
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        role="button"
                        className="btn btn-neutral"
                        disabled={disabled}
                    >
                        <Settings2 size={18} />
                    </button>
                    <div
                        tabIndex={0}
                        className="dropdown-content z-[1] w-56 p-4 bg-base-100 rounded-box shadow-lg"
                    >
                        <div className="space-y-3 form-control">
                            <label className="flex items-center justify-between label">
                                <span className="label-text">X-Axis:</span>
                                <input
                                    value={xAxis}
                                    onChange={(e) =>
                                        setXAxis(parseFloat(e.target.value))
                                    }
                                    type="number"
                                    className="w-24 text-center input input-bordered input-sm"
                                />
                            </label>
                            <label className="flex items-center justify-between label">
                                <span className="label-text">Y-Axis:</span>
                                <input
                                    value={yAxis}
                                    onChange={(e) =>
                                        setYAxis(parseFloat(e.target.value))
                                    }
                                    type="number"
                                    className="w-24 text-center input input-bordered input-sm"
                                />
                            </label>
                            <label className="flex items-center justify-between label">
                                <span className="label-text">Font Size:</span>
                                <input
                                    type="number"
                                    className="w-24 text-center input input-bordered input-sm"
                                    value={fontSize}
                                    onChange={(e) =>
                                        setFontSize?.(
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {officeInput.trim() !== "" && filteredOffices.length > 0 && (
                <div className="mt-1 overflow-x-auto border max-h-56 rounded-box border-base-content/5 bg-base-100">
                    <table className="table table-sm">
                        <tbody>
                            {filteredOffices.map((office, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer hover:bg-base-200"
                                    onClick={() => handleOfficeClick(office)}
                                >
                                    <th>{office}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default OfficeSearchWithSettings;
