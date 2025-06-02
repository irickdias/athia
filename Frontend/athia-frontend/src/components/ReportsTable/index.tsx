import React from "react";

interface ReportsTableProps {
    reports: Company[] | null;
}

export default function ReportsTable({ reports }: ReportsTableProps) {
    return (
        <table className="[&>thead]:border-b-1 [&>*>tr>td]:p-2 [&>tbody>tr:nth-child(even)]:bg-gray-200 [&>tbody>tr:nth-child(even)]:dark:bg-[#3b3b3b] w-full">
            <thead className="font-semibold text-left [&>tr>th]:p-2">
                <tr>
                    <th>Nome</th>
                    <th>Nome Fantasia</th>
                    <th>CNPJ</th>
                    <th>Setor</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {
                    reports && reports.length > 0 ? reports.map((company: Company, key: number) => {
                        return <React.Fragment key={key}>
                            {company.sectors && company.sectors.map((sector: Sector, key: number) => (
                                <tr key={key}>
                                    <td>{company.socialName}</td>
                                    <td>{company.fantasyName}</td>
                                    <td>{company.cnpj}</td>
                                    <td>{sector.description}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    })
                        :
                        <tr className="bg-red-200 dark:bg-pink-950">
                            <td colSpan={9} >Nenhum registro encontrado</td>

                        </tr>
                }
            </tbody>

        </table>
    );
}