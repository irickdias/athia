'use client'

import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import PaginationNavigator from "@/components/PaginationNavigator";
import { apiUrl } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [_, setUpdatingData] = useState(false);
  const [refreshData, setRefreshData] = useState(0);
  const [data, setData] = useState<any>("");
  const [filterBy, setFilterBy] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filters = [
    {
      id: 1,
      name: "Empresa"
    },
    {
      id: 2,
      name: "Setor"
    }
  ]

  useEffect(() => {
    //getComSec();
  }, [refreshData, page]);


  async function getComSec() {
    setUpdatingData(true);
    try {

      const response: any = await fetch(`${apiUrl}api/report?company=${filterBy == 1 ? search : ''}&sector=${filterBy == 2 ? search : ''}&pageNumber=${page}`, {
        method: 'GET'
      });
      const json = await response.json();

      if (response.ok) {
        setData(json);
        //console.log(debts);
      }
      else {
        toast.error("Erro ao carregar o relatório.");
      }

    } catch (error) {
      console.error('Erro ao carregar o relatório.', error);
      toast.error("Erro ao carregar o relatório.");
    }
    setUpdatingData(false);
  }

  return (
    <section className="relative min-h-[800px] mx-5 mb-2 p-5 bg-gray-100 dark:bg-dark rounded-sm shadow-md">
      <div className="w-full relative space-y-4 flex flex-col bg-orange-600">
        <h1 className="text-2xl">Relatório</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CustomSearch search={search} setSearch={setSearch} setUpdateData={setRefreshData} setPage={setPage}/>
            {/* <p>Filtrar por:</p> */}
            <CustomSelect options={filters} value={filterBy} onChange={(e: any) => { setFilterBy(e), setSearch("") }} required={false} />
          </div>
          <PaginationNavigator totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
    </section>
  );
}
