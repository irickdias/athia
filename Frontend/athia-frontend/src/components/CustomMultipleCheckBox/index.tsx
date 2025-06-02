
interface CustomMultipleCheckBoxProps {
    options: Sector[];
    selectedIds: number[];
    onChange: (newSelectedIds: number[]) => void;
}

export default function CustomMultipleCheckBox({ options, selectedIds, onChange }: CustomMultipleCheckBoxProps) {
    const toggleId = (id: number) => {
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter((i) => i !== id)
            : [...selectedIds, id];
        onChange(newSelected);
    };

    return (
        <div className="space-y-2">
            {options.map((opt) => {
                const isChecked = selectedIds.includes(opt.id);

                return (
                    <div
                        key={opt.id}
                        onClick={() => toggleId(opt.id)}
                        className="flex items-center gap-2 cursor-pointer select-none"
                    >
                        <div
                            className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all ${isChecked ? "bg-green-700 border-green-700" : "bg-transparent border-green-500"}`}
                        >
                            {isChecked && (
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                            {opt.description}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}