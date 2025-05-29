using athia_backend.Models;
using athia_backend.Models.DTOs;

namespace athia_backend.Interfaces
{
    public interface ICompanyRepository
    {
        Task<List<Company>> GetAll();
        Task<Company?> GetById(int id);
        Task<Company> Create(CompanyCreateDto companyDto);
        Task<Company?> Update(int id, CompanyCreateDto companyDto);
        Task<Company?> Delete(int id);
    }
}
