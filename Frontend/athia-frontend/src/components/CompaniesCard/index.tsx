'use client'

import { apiUrl } from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import CustomDeleteAlert from "../CustomDeleteAlert";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import React from "react";
import NewCompanyForm from "../NewCompanyForm";

interface CompaniesCardProps {
    company: Company;
    setRefreshData: any;
}

export default function CompaniesCard({ company, setRefreshData }: CompaniesCardProps) {
    const [editCompanyModal, setEditCompanyModal] = useState(false);
    const [deleteComModalOpen, setDeleteComModalOpen] = useState(false);
    const companySectionsIds: number[] = company.sectors ? company.sectors.map((i) => i.id) : [];
    const [isOpen, setIsOpen] = useState(false);
    //console.log("dsadsadsadsa", companySectionsIds);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    async function handleConfirmEditCompany(data: CompanyForm, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // setInputDisabled(true);

        const loadingToast = toast.loading("Um momento");

        console.log(data.cnpj.replace(/\D/g, ""));

        const response = await fetch(`${apiUrl}api/company/${company.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                socialName: data.socialName,
                fantasyName: data.fantasyName,
                cnpj: data.cnpj.replace(/\D/g, ""),
                sectorIds: data.sectors
            })
        })

        // console.log(response.status)

        if (response.status == 200) {
            toast.success("Empresa atualizada!");
            toast.dismiss(loadingToast);
            setEditCompanyModal(false);
            setRefreshData(Math.random());
        }
        else {
            toast.error("Ocorreu algo inesperado.");
            toast.dismiss(loadingToast);
        }
    }

    async function handleDeleteCompany() {
        const loadingToast = toast.loading("Um momento");

        const response = await fetch(`${apiUrl}api/company/${company.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })

        // console.log(response.status)

        if (response.status == 204) {
            toast.success("Empresa excluída!");
            toast.dismiss(loadingToast);
            setDeleteComModalOpen(false);
            setRefreshData(Math.random());
        }
        else {
            toast.error("Ocorreu algo inesperado.");
            toast.dismiss(loadingToast);
        }
    }

    return (
        <div className="w-full border-1 border-primary-light dark:border-none dark:bg-[#3b3b3b] p-5 rounded-lg shadow-md flex flex-col justify-between items-start">
            <div className="w-full flex items-center justify-between transition-all">
                <h2 className="text-xl font-semibold text-primary dark:text-primary-light">{company.socialName}</h2>
                <div className="space-x-2">
                    <button onClick={() => { setEditCompanyModal(true) }} className="p-1 hover:bg-blue-300/80 rounded-sm w-auto transition-all hover:cursor-pointer [&>*]:stroke-gray-500 [&>*]:dark:stroke-gray-300 hover:[&>*]:stroke-blue-700">
                        <HiOutlinePencilAlt className="w-5 h-5" />
                    </button>
                    <button onClick={() => setDeleteComModalOpen(true)} className="p-1 hover:bg-red-300/80 rounded-sm w-auto transition-all hover:cursor-pointer [&>*]:stroke-gray-500 [&>*]:dark:stroke-gray-300 hover:[&>*]:stroke-red-500">
                        <HiOutlineTrash className="w-5 h-5" />
                    </button>
                </div>

            </div>


            {/* Setores */}
            <div className={`mt-4 w-full transition-all duration-300 ${isOpen ? 'max-h-full' : 'max-h-0 overflow-hidden'}`}>
                <ul>
                    {
                        company.sectors && company.sectors.length > 0 ?
                            <>
                                {company.sectors.map((sector: Sector) => (
                                    <React.Fragment key={sector.id}>
                                                <li key={sector.id} className="text-gray-500 dark:text-gray-300 py-2 pl-5 border-b border-gray-400 dark:border-gray-200 flex justify-between">
                                                    <p>{sector.description}</p>
                                                </li>
                                    </React.Fragment>
                                ))}
                            </>
                            :
                            <li>
                                Não há setores
                            </li>
                    }
                    
                </ul>
            </div >

            {/* Botão de Expansão */}
            < button
                onClick={toggleOpen}
                className="mt-4 text-dark dark:text-white flex items-center justify-center space-x-2 hover:underline hover:cursor-pointer"
            >
                <span>{isOpen ? 'Esconder setores' : 'Mostrar setores'}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button >

            < CustomModal open={editCompanyModal} onClose={() => setEditCompanyModal(false) }>
                <NewCompanyForm 
                    isUpdate={true} 
                    initialData={{
                        socialName: company.socialName,
                        fantasyName: company.fantasyName,
                        cnpj: company.cnpj,
                        sectors: companySectionsIds
                    }}
                    onSubmit={handleConfirmEditCompany}
                    onCancel={() => { setEditCompanyModal(false) }}
                />
            </CustomModal >

            <CustomModal open={deleteComModalOpen} onClose={() => { setDeleteComModalOpen(false) }}>
                <CustomDeleteAlert
                    title="Deletar empresa?"
                    description={`Você está deletando a empresa '${company.socialName}'. Confirmar ação?`}
                    cancelAction={() => { setDeleteComModalOpen(false) }}
                    confirmAction={() => { handleDeleteCompany }}
                >
                </CustomDeleteAlert>
            </CustomModal>
        </div >
    );
}