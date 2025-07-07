import { Settings2 } from "lucide-react";
import React from "react";

interface Props {
    placeholder?: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    xAxis: number;
    setXAxis: React.Dispatch<React.SetStateAction<number>>;
    yAxis: number;
    setYAxis: React.Dispatch<React.SetStateAction<number>>;
    fontSize?: number;
    setFontSize?: React.Dispatch<React.SetStateAction<number>>;
}

const InputWithSettings = ({
    placeholder,
    inputValue,
    xAxis,
    yAxis,
    fontSize,
    setInputValue,
    setXAxis,
    setYAxis,
    setFontSize,
}: Props) => {
    return (
        <div className="join">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-neutral">
                    <Settings2 size={18} />
                </div>
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
                                    setFontSize?.(parseFloat(e.target.value))
                                }
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputWithSettings;
