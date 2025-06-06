'use client'

import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import PaginationNavigator from "@/components/PaginationNavigator";
import ReportsTable from "@/components/ReportsTable";
import { apiUrl } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [_, setUpdatingData] = useState(false);
  const [refreshData, setRefreshData] = useState(0);
  const [data, setData] = useState<Reports | any>("");
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
    getReports();
  }, [refreshData, page]);


  async function getReports() {
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
    <section className="relative h-[820px] overflow-auto mx-5 mb-2 p-5 bg-gray-100 dark:bg-dark rounded-sm shadow-md">
      <div className="w-full relative space-y-4 flex flex-col">
        <h1 className="text-2xl">Relatório</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CustomSearch search={search} setSearch={setSearch} setUpdateData={setRefreshData} setPage={setPage}/>
            {/* <p>Filtrar por:</p> */}
            <CustomSelect options={filters} value={filterBy} onChange={(e: any) => { setFilterBy(e), setSearch(""), setRefreshData(Math.random()) }} required={false} />
          </div>
          <PaginationNavigator totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />
        </div>
      </div>

      <div className="mt-4">
          <ReportsTable reports={data.data} filterBy={filterBy} search={search}/>
      </div>
    </section>
  );
}
