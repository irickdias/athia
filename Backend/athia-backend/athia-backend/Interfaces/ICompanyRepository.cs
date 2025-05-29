using athia_backend.Models;
using athia_backend.Models.DTOs;

namespace athia_backend.Interfaces
{
    public interface ICompanyRepository
    {
        Task<List<Company>> GetAll();
        Task<Company?> GetById(int id);
        Task<Company?> Create(CompanyDto companyDto);
        Task<Company?> Update(int id, CompanyDto companyDto);
        Task<Company?> Delete(int id);
    }
}
