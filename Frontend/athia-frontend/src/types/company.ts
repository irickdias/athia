interface Company {
    id: number;
    socialName: string;
    fantasyName: string;
    cnpj: string;
    sectors: Sector[] | null;
}

interface CompanyForm {
    socialName: string;
    fantasyName: string;
    cnpj: string;
    sectors: number[];
}