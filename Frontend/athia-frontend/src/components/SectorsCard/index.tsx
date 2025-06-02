'use client'

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { PiNotePencil } from "react-icons/pi";
// import CreateEditDepartmentSector from "../CreateEditDepartmentSector";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
// import CustomDeleteAlert from "../CustomDeleteAlert";
import React from "react";
import CreateEditCompanySector from "../CreateEditDepartmentSector";
import CustomDeleteAlert from "../CustomDeleteAlert";
import { apiUrl } from "@/utils/api";

interface SectorsCardProps {
    sector: Sector;
    setRefreshData: any;
}

export default function SectorsCard({ sector, setRefreshData }: SectorsCardProps) {
    const [editSec, setEditSec] = useState(false);
    const [_, setInputDisabled] = useState(false);
    const [editSecValue, setEditSecValue] = useState("");
    const [deleteSecModalOpen, setDeleteSecModalOpen] = useState(false);

    async function handleConfirmEditSector() {
        setInputDisabled(true);

        const loadingToast = toast.loading("Um momento");

        const response = await fetch(`${apiUrl}api/sector/${sector.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: editSecValue })
        })

        // console.log(response.status)

        if (response.status == 200) {
            toast.success("Setor atualizado!");
            resetEditSecInput();
            toast.dismiss(loadingToast);
            setRefreshData(Math.random());
        }
        else {
            toast.error("Ocorreu algo inesperado.");
            toast.dismiss(loadingToast);
            setInputDisabled(false);
        }
    }

    async function handleDeleteSector() {
        const loadingToast = toast.loading("Um momento");

        const response = await fetch(`${apiUrl}api/sector/${sector.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })

        // console.log(response.status)

        if (response.status == 204) {
            toast.success("Setor excluído!");
            toast.dismiss(loadingToast);
            setDeleteSecModalOpen(false);
            setRefreshData(Math.random());
        }
        else {
            toast.error("Ocorreu algo inesperado.");
            toast.dismiss(loadingToast);
        }
    }

    function resetEditSecInput() {
        setEditSec(false);
        setEditSecValue("");
        setInputDisabled(false);
    }


    return (
        <div className="w-full border-1 border-primary-light dark:border-none dark:bg-[#3b3b3b] p-5 rounded-lg shadow-md flex flex-col justify-between items-start">
            <div className="w-full flex items-center justify-between transition-all">
                {
                    editSec ?
                        <CreateEditCompanySector
                            value={editSecValue}
                            setValue={setEditSecValue}
                            onConfirm={handleConfirmEditSector}
                            onCancel={() => { setEditSec(false), setEditSecValue("") }}
                        />
                        :
                        <>
                            <h2 className="text-xl font-semibold text-primary dark:text-primary-light">{sector.description}</h2>
                            <div className="space-x-2">
                                <button onClick={() => { setEditSec(true) }} className="p-1 hover:bg-blue-300/80 rounded-sm w-auto transition-all hover:cursor-pointer [&>*]:stroke-gray-500 [&>*]:dark:stroke-gray-300 hover:[&>*]:stroke-blue-700">
                                    <HiOutlinePencilAlt className="w-5 h-5" />
                                </button>
                                <button onClick={() => setDeleteSecModalOpen(true)} className="p-1 hover:bg-red-300/80 rounded-sm w-auto transition-all hover:cursor-pointer [&>*]:stroke-gray-500 [&>*]:dark:stroke-gray-300 hover:[&>*]:stroke-red-500">
                                    <HiOutlineTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                }

            </div>

            <CustomModal open={deleteSecModalOpen} onClose={() => { setDeleteSecModalOpen(false) }}>
                <CustomDeleteAlert
                    title="Deletar setor?"
                    description={`Você está deletando o setor '${sector.description}'. Confirmar ação?`}
                    cancelAction={() => { setDeleteSecModalOpen(false) }}
                    confirmAction={() => { handleDeleteSector() }}
                >
                </CustomDeleteAlert>
            </CustomModal>
        </div>
    );
}