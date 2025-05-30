'use client'

import { apiUrl } from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import CustomDeleteAlert from "../CustomDeleteAlert";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

interface CompaniesCardProps {
    company: Company;
    setRefreshData: any;
}

export default function CompaniesCard({ company, setRefreshData }: CompaniesCardProps) {
    const [editCompanyModal, setEditCompanyModal] = useState(false);
    const [deleteComModalOpen, setDeleteComModalOpen] = useState(false);

    async function handleConfirmEditCompany(data: CompanyForm, event: React.FormEvent) {
        event.preventDefault();
        // setInputDisabled(true);

        const loadingToast = toast.loading("Um momento");

        const response = await fetch(`${apiUrl}api/sector/${company.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                socialName: data.socialName,
                fantasyName: data.fantasyName,
                cnpj: data.cnpj,
                sectors: data.sectors
            })
        })

        // console.log(response.status)

        if (response.status == 200) {
            toast.success("Empresa atualizada!");
            toast.dismiss(loadingToast);
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
            {/* <div className={`mt-4 w-full transition-all duration-300 ${isOpen ? 'max-h-full' : 'max-h-0 overflow-hidden'}`}>
                        <ul>
                            {/* {
                                department.sectors.length > 0 ?
                                    <>
                                        {department.sectors.map((sector: any) => (
                                            <React.Fragment key={sector.id}>
                                                {
                                                    editSec === sector.id ? (
                                                        <li key={sector.id} className="text-gray-300 py-2 pl-5 border-b border-gray-200 flex justify-between">
                                                            <CreateEditDepartmentSector
                                                                value={editSecValue}
                                                                setValue={setEditSecValue}
                                                                onConfirm={() => handleConfirmEditSection(sector.id)}
                                                                onCancel={() => { setEditSec(null), setEditSecValue("") }}
                                                                placeholder='Digite o setor'
                                                            />
                                                        </li>
                                                    )
                                                        // <CustomSectorLi departmentId={department.id} sectorId={sector.id}/>
                                                        :
                                                        <li key={sector.id} className="text-gray-300 py-2 pl-5 border-b border-gray-200 flex justify-between">
                                                            <p>{sector.name}</p>
                                                            <div className="space-x-2">
                                                                <button onClick={() => (setEditSec(sector.id), setEditSecValue(sector.name))} className="p-1 bg-blue-300 hover:bg-blue-300/80 rounded-sm w-auto hover:cursor-pointer">
                                                                    <HiOutlinePencilAlt className="w-4 h-4 stroke-blue-700" />
                                                                </button>
                                                                <button onClick={() => (setDeleteSecModalOpen(true), setDeleteSector({ id: sector.id, name: sector.name }))} className="p-1 bg-red-300 hover:bg-red-300/80 rounded-sm w-auto hover:cursor-pointer">
                                                                    <HiOutlineTrash className="w-4 h-4 stroke-red-500" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </>
                                    :
                                    <li>
                                        Não há setores
                                    </li>
                            } */}
            {/* {
                                newSec ?
                                    <li className="text-gray-300 py-2 pl-5 border-b border-gray-200 flex justify-between">
                                        <CreateEditDepartmentSector
                                            value={newSecValue}
                                            setValue={setNewSecValue}
                                            onConfirm={handleConfirmNewSector}
                                            onCancel={() => { setNewSec(false), setNewSecValue("") }}
                                            placeholder='Digite o setor'
                                        />
                                    </li>
                                    :
                                    <li className="text-gray-300 py-2 pl-5 border-b border-gray-200 flex justify-between">
                                        <p className="text-purple-300">Adicionar setor</p>
                                        <button onClick={() => setNewSec(true)} className="p-1 bg-purple-300 hover:bg-purple-300/80 rounded-sm w-auto hover:cursor-pointer">
                                            <FiPlus className="w-4 h-4 stroke-purple-700" />
                                        </button>
                                    </li>
                            } *
                        </ul>
                    </div>
        
                    {/* Botão de Expansão *
                    <button
                        onClick={toggleOpen}
                        className="mt-4 text-white flex items-center justify-center space-x-2 hover:underline hover:cursor-pointer"
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
                    </button> */}

            {/* <CustomModal open={deleteDepModalOpen} onClose={() => setDeleteDepModalOpen(false)}>
                        <CustomDeleteAlert
                            title="Deletar departamento?"
                            description={`Você está deletando o departamento '${''}' e seus setores. Caso existam processos atrelados a este departamento, a ação não pode ser concluída.`}
                            cancelAction={() => setDeleteDepModalOpen(false)}
                            confirmAction={() => {}}
                        >
                        </CustomDeleteAlert>
                    </CustomModal> */}

            <CustomModal open={editCompanyModal } onClose={() => setEditCompanyModal(false)}>
                <p></p>
            </CustomModal>

            <CustomModal open={deleteComModalOpen} onClose={() => { setDeleteComModalOpen(false) }}>
                <CustomDeleteAlert
                    title="Deletar empresa?"
                    description={`Você está deletando a empresa '${company.socialName}. Confirmar ação?'`}
                    cancelAction={() => { setDeleteComModalOpen(false) }}
                    confirmAction={() => { handleDeleteCompany }}
                >
                </CustomDeleteAlert>
            </CustomModal>
        </div>
    );
}