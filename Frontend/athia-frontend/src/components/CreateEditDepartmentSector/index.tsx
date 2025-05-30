import { IoCheckmarkDone, IoClose } from "react-icons/io5";

interface CreateEditComSecProps {
    value: string;
    setValue: any;
    onConfirm: () => void;
    onCancel: () => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function CreateEditCompanySector(props: CreateEditComSecProps) {
    return (
        <>
            <div className="w-full flex items-center justify-between">
                {/* Input */}
                <div>
                    <input
                        type="text"
                        value={props.value}
                        onChange={(e) => props.setValue(e.target.value)}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        size={20}
                        className="flex-1 p-1 border rounded-md focus:ring-2 disabled:bg-gray-500"
                    />
                </div>


                <div className="flex items-center space-x-2">
                    <button
                        onClick={props.onConfirm}
                        disabled={props.disabled || props.value.trim() === ""}
                        className="p-1 bg-green-600 text-white rounded-full hover:bg-green-600/80 disabled:bg-gray-400 transition-all hover:cursor-pointer hover:disabled:cursor-default"
                    >
                        <IoCheckmarkDone />
                    </button>

                    <button
                        onClick={props.onCancel}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-500/80 transition-all hover:cursor-pointer"
                    >
                        <IoClose />
                    </button>
                </div>

            </div>
        </>
    );
}