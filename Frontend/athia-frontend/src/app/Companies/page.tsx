'use client'

import CompaniesCard from "@/components/CompaniesCard";
import CustomModal from "@/components/CustomModal";
import NewCompanyForm from "@/components/NewCompanyForm";
import { apiUrl } from "@/utils/api";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Companies() {
    const [refreshData, setRefreshData] = useState(1);

    // process data
    const [data, setData] = useState<Company[]>();

    // controladores de modais
    const [newCompanyModalOpen, setNewCompanyModalOpen] = useState(false);

    useEffect(() => {
        //getCompanies();
    }, [refreshData])

    async function getCompanies() {
        let request = await fetch(`${apiUrl}api/company/`);
        let json = await request.json();
        setData(json);
        // console.log("adasdas", json);
        // console.log("adasdas", json[0].name);
    }

    async function handleConfirm(form: CompanyForm, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(form)
        // const loadingToast = toast.loading("Um momento");

        // const response = await fetch(`${apiUrl}api/company/`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         socialName: form.socialName,
        //         fantasyName: form.fantasyName,
        //         cnpj: form.cnpj,
        //         sectors: form.sectors
        //     })
        // })

        // // console.log(response.status)

        // if (response.status == 201) {
        //     toast.success("Empresa cadastrada!");
        //     toast.dismiss(loadingToast);
        //     setNewCompanyModalOpen(false);
        //     setRefreshData(Math.random());
        // }
        // else {
        //     toast.error("Ocorreu algo inesperado.");
        //     toast.dismiss(loadingToast);
        // }
        // console.log("concluido", newDepValue);
    }

    return (
        <section className="relative min-h-[800px] mx-5 mb-2 p-5 bg-gray-200 dark:bg-dark rounded-sm">
            <div className="w-full relative flex justify-between">
                <h1 className="text-2xl">Empresas</h1>
                <div className="w-70 flex justify-end relative">
                    <button onClick={() => setNewCompanyModalOpen(true)} className="relative flex items-center gap-1 px-2 py-1 bg-primary-light hover:bg-primary-light/80 rounded-sm w-auto hover:cursor-pointer">
                        <FiPlus className="w-5 h-5" />
                        <p>Nova Empresa</p>
                    </button>
                </div>
            </div>

            <div className=' relative mt-8 '>
                <div className='w-full grid md:grid-cols-3 xl:grid-cols-3 gap-4 justify-between items-start'>
                    {
                        data && data.length > 0 ?
                            (
                                data.map((item: Company, key: number) => (
                                    <CompaniesCard key={key} company={item} setRefreshData={setRefreshData} />
                                ))
                            )
                            :
                            <></>
                    }
                    {/* {
                                    mock.length > 0 ?
                                    (
                                        mock.map((item: Sector, key: number) => (
                                            <SectorsCard sector={item} setRefreshData={setRefreshData}/>
                                        ))
                                    )
                                    :
                                    <></>
                                } */}
                </div>
            </div>

            <CustomModal open={newCompanyModalOpen} onClose={() => setNewCompanyModalOpen(false)}>
                <NewCompanyForm onSubmit={handleConfirm} onCancel={() => { setNewCompanyModalOpen(false) }} />
            </CustomModal>
        </section>
    );
}