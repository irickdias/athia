'use client'

import { useState } from "react";
import CustomMultipleCheckBox from "../CustomMultipleCheckBox";

interface NewCompanyFormProps {
    isUpdate?: boolean;
    initialData?: Partial<CompanyForm>;
    onSubmit: (data: CompanyForm, event: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

export default function NewCompanyForm({isUpdate, initialData, onSubmit, onCancel}: NewCompanyFormProps) {
    const [formData, setFormData] = useState<CompanyForm>({
        socialName: isUpdate && initialData?.socialName ? initialData.socialName : "",
        fantasyName: isUpdate && initialData?.fantasyName ? initialData.fantasyName : "",
        cnpj: isUpdate && initialData?.cnpj ? initialData.cnpj : "",
        sectors: isUpdate && initialData?.sectors ? initialData.sectors : []
    });

    const handleChange = (key: keyof CompanyForm, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return(
        <form onSubmit={(e) => onSubmit(formData, e)} className="min-w-100">
            <div className="w-full max-w-lg text-dark dark:text-white">
                <h2 className="text-xl font-bold mb-4">{isUpdate ? "Atualizar Empresa" : "Nova empresa"}</h2>

                <input
                    type="text"
                    placeholder="Nome da empresa"
                    value={formData.socialName}
                    onChange={(e) => handleChange("socialName", e.target.value)}
                    className="w-full p-2 my-2 dark:bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <input
                    type="text"
                    placeholder="Nome fantasia"
                    value={formData.fantasyName}
                    onChange={(e) => handleChange("fantasyName", e.target.value)}
                    className="w-full p-2 my-2 dark:bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <input
                    type="text"
                    placeholder="CNPJ da empresa"
                    value={formData.cnpj}
                    onChange={(e) => handleChange("cnpj", e.target.value)}
                    className="w-full p-2 my-2 dark:bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <p className="my-2">Adicionar Setores:</p>
                <div className="flex w-auto">
                    <CustomMultipleCheckBox options={[{id: 1, label: 'dsadsadsada'}, {id: 2, label: 'adfsfsfsfds'}]} selectedIds={formData.sectors} onChange={(e) => handleChange("sectors", e)} />
                </div>


                <div className="mt-8 flex justify-center space-x-2">
                    <button onClick={onCancel} className="border-1 border-red-500 font-semibold hover:border-red-500/80 py-1 px-2 rounded-sm text-red-400 hover:text-red-400/80 hover:cursor-pointer">Cancelar</button>
                    <button type="submit" className="bg-green-600 text-dark font-semibold dark:text-white hover:bg-green-600/80 py-1 px-2 rounded-sm hover:cursor-pointer">Confirmar</button>
                </div>
            </div>
        </form>
    );
}