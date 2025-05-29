using athia_backend.Models.DTOs;

namespace athia_backend.Models.Mappers
{
    public static class CompanyMapper
    {
        public static CompanyDto ToCompanyDto (this Company company)
        {
            return new CompanyDto
            {
                SocialName = company.SocialName,
                FantasyName = company.FantasyName,
                Cnpj = company.Cnpj
            };
        }
    }
}
