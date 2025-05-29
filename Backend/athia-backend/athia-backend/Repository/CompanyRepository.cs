using athia_backend.Interfaces;
using athia_backend.Models;
using athia_backend.Models.DTOs;

namespace athia_backend.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        public Task<Company?> Create(CompanyDto companyDto)
        {
            throw new NotImplementedException();
        }

        public Task<Company?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Company>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Company?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Company?> Update(int id, CompanyDto companyDto)
        {
            throw new NotImplementedException();
        }
    }
}
