using athia_backend.Interfaces;
using athia_backend.Models;
using athia_backend.Models.DTOs;

namespace athia_backend.Repository
{
    public class SectorRepository : ISectorRepository
    {
        public Task<Sector?> Create(SectorDto sectorDto)
        {
            throw new NotImplementedException();
        }

        public Task<Sector?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Sector>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Sector?> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Sector?> Update(int id, SectorDto sectorDto)
        {
            throw new NotImplementedException();
        }
    }
}
