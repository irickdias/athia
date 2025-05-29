using athia_backend.Models;
using athia_backend.Models.DTOs;

namespace athia_backend.Interfaces
{
    public interface ISectorRepository
    {
        Task<List<Sector>> GetAll();
        Task<Sector?> GetById(int id);
        Task<Sector?> Create(SectorDto sectorDto);
        Task<Sector?> Update(int id, SectorDto sectorDto);
        Task<Sector?> Delete(int id);

    }
}
