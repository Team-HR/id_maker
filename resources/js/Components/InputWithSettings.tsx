import { Settings2 } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    placeholder?: string;
    disabled?: boolean;

    xAxis: number;
    setXAxis: React.Dispatch<React.SetStateAction<number>>;
    yAxis: number;
    setYAxis: React.Dispatch<React.SetStateAction<number>>;
    fontSize?: number;
    setFontSize?: React.Dispatch<React.SetStateAction<number>>;
    scale?: number;
    setScale?: React.Dispatch<React.SetStateAction<number>>;
}

const InputWithSettings = ({
    children,
    placeholder,
    disabled,
    xAxis,
    yAxis,
    fontSize,
    scale,
    setXAxis,
    setYAxis,
    setFontSize,
    setScale,
}: Props) => {
    return (
        <div className="join">
            {children}

            <div className="dropdown dropdown-end">
                <button
                    tabIndex={0}
                    role="button"
                    className="btn btn-primary"
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
                        {fontSize !== undefined && (
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
                        )}
                        {scale !== undefined && (
                            <label className="flex items-center justify-between label">
                                <span className="label-text">Scale:</span>
                                <input
                                    type="number"
                                    className="w-24 text-center input input-bordered input-sm"
                                    value={scale}
                                    onChange={(e) =>
                                        setScale?.(parseFloat(e.target.value))
                                    }
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputWithSettings;
