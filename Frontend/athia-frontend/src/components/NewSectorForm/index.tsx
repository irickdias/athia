'use client'

import { useState } from "react";

interface NewSectorFormProps {
    onSubmit: (data: SectorForm, event: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

export default function NewSectorForm({ onSubmit, onCancel }: NewSectorFormProps) {
    const [formData, setFormData] = useState<SectorForm>({
        description: ""
    });

    const handleChange = (key: keyof Sector, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <form onSubmit={(e) => onSubmit(formData, e)} className="min-w-100">
            <div className="w-full max-w-lg text-dark dark:text-white">
                <h2 className="text-xl font-bold mb-4">Novo Setor</h2>

                <input
                    type="text"
                    placeholder="Nome do setor"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full p-2 my-2 dark:bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <div className="mt-8 flex justify-center space-x-2">
                    <button onClick={onCancel} className="border-1 border-red-500 font-semibold hover:border-red-500/80 py-1 px-2 rounded-sm text-red-400 hover:text-red-400/80 hover:cursor-pointer">Cancelar</button>
                    <button type="submit" className="bg-green-600 text-dark font-semibold dark:text-white hover:bg-green-600/80 py-1 px-2 rounded-sm hover:cursor-pointer">Confirmar</button>
                </div>
            </div>
        </form>
    );
}