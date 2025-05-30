'use client'

import CustomModal from "@/components/CustomModal";
import NewSectorForm from "@/components/NewSectorForm";
import NewSectorFrom from "@/components/NewSectorForm";
import SectorsCard from "@/components/SectorsCard";
import { apiUrl } from "@/utils/api";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Sectors() {
    const [refreshData, setRefreshData] = useState(1);
    // select boxes
    const [departments, setDepartments] = useState([]);
    const [selectedDep, setSelectedDep] = useState("");
    const [sectors, setSectors] = useState([]);
    const [selectedSec, setSelectedSec] = useState("");

    // process data
    const [data, setData] = useState<Sector[]>();

    // controladores de modais
    const [newSectorModalOpen, setNewSectorModalOpen] = useState(false);

    const [page, setPage] = useState(1);

    useEffect(() => {
        getSectors();
    }, [refreshData])

    async function getSectors() {
        let request = await fetch(`${apiUrl}api/sector/`);
        let json = await request.json();
        setData(json);
        // console.log("adasdas", json);
        // console.log("adasdas", json[0].name);
    }

    async function handleConfirm(data: SectorForm, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const loadingToast = toast.loading("Um momento");

        const response = await fetch(`${apiUrl}api/sector/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: data.description })
        })

        // console.log(response.status)

        if(response.status == 201) {
            toast.success("Departamento cadastrado!");
            toast.dismiss(loadingToast);
            setNewSectorModalOpen(false);
            setRefreshData(Math.random());
        }
        else {
            toast.error("Ocorreu algo inesperado.");
            toast.dismiss(loadingToast);
        }
        // console.log("concluido", newDepValue);
    }

    const mock: Sector[] = [
        {
            id: 1,
            description: "Recursos HUmanadasda"
        },
        {
            id: 2,
            description: "RTI"
        }
    ]

    return(
        <section className="relative min-h-[800px] mx-5 mb-2 p-5 bg-gray-200 dark:bg-dark rounded-sm">
            <div className="w-full relative flex justify-between">
                <h1 className="text-2xl">Setores</h1>
                <div className="w-70 flex justify-end relative">
                    <button onClick={() => setNewSectorModalOpen(true)} className="relative flex items-center gap-1 px-2 py-1 bg-primary-light hover:bg-primary-light/80 rounded-sm w-auto hover:cursor-pointer">
                        <FiPlus className="w-5 h-5" />
                        <p>Novo Setor</p>
                    </button>
                </div>
            </div>

            <div className=' relative mt-8 '>
                <div className='w-full grid md:grid-cols-3 xl:grid-cols-3 gap-4 justify-between items-start'>
                    {
                        data && data.length > 0 ?
                        (
                            data.map((item: Sector, key: number) => (
                                <SectorsCard key={key} sector={item} setRefreshData={setRefreshData}/>
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

            <CustomModal open={newSectorModalOpen} onClose={() => setNewSectorModalOpen(false)}>
                <NewSectorForm onSubmit={handleConfirm} onCancel={() => { setNewSectorModalOpen(false) }}/>
            </CustomModal>
        </section>
    );
}