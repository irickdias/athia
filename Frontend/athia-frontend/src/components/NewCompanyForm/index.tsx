'use client'

import { useEffect, useState } from "react";
import CustomMultipleCheckBox from "../CustomMultipleCheckBox";
import { apiUrl } from "@/utils/api";
import { AiOutlineLoading } from "react-icons/ai";

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
    const [data, setData] = useState<Sector[]>();

    useEffect(() => {
        getSectors();
    }, [])

    const handleChange = (key: keyof CompanyForm, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    async function getSectors() {
        let request = await fetch(`${apiUrl}api/sector/`);
        let json = await request.json();
        setData(json);
        // console.log("adasdas", json);
        // console.log("adasdas", json[0].name);
    }

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
                {
                    data && data.length > 0 ?
                    <div className="flex w-auto max-h-[400px] overflow-auto">
                        <CustomMultipleCheckBox options={data} selectedIds={formData.sectors} onChange={(e) => handleChange("sectors", e)} />
                    </div>
                    :
                    <AiOutlineLoading className="w-4 h-4 animate-spin"/>
                }


                <div className="mt-8 flex justify-center space-x-2">
                    <button onClick={onCancel} className="border-1 border-red-500 font-semibold hover:border-red-500/80 py-1 px-2 rounded-sm text-red-400 hover:text-red-400/80 hover:cursor-pointer">Cancelar</button>
                    <button type="submit" className="bg-green-600 text-dark font-semibold dark:text-white hover:bg-green-600/80 py-1 px-2 rounded-sm hover:cursor-pointer">Confirmar</button>
                </div>
            </div>
        </form>
    );
}