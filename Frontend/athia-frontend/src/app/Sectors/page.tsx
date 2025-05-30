'use client'

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function Sectors() {
    const [refreshData, setRefreshData] = useState(1);
    // select boxes
    const [departments, setDepartments] = useState([]);
    const [selectedDep, setSelectedDep] = useState("");
    const [sectors, setSectors] = useState([]);
    const [selectedSec, setSelectedSec] = useState("");

    // process data
    const [data, setData] = useState<any>("");

    // controladores de modais
    const [newSectorModalOpen, setNewSectorsModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    return(
        <section className="relative min-h-[800px] mx-5 mb-2 p-5 bg-dark rounded-sm">
            <div className="w-full relative flex justify-between">
                <h1 className="text-2xl">Setores</h1>
                <div className="w-70 flex justify-end relative">
                    <button onClick={() => setNewSectorsModalOpen(true)} className="relative flex items-center gap-1 px-2 py-1 bg-purple-400 hover:bg-purple-400/80 rounded-sm w-auto hover:cursor-pointer">
                        <FiPlus className="w-5 h-5" />
                        <p>Novo Setor</p>
                    </button>
                </div>
            </div>
        </section>
    );
}