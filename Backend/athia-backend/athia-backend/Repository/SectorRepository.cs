using athia_backend.Data;
using athia_backend.Interfaces;
using athia_backend.Models;
using athia_backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace athia_backend.Repository
{
    public class SectorRepository : ISectorRepository
    {
        private readonly ApplicationDBContext _context;

        public SectorRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async  Task<Sector> Create(SectorDto sectorDto)
        {
            var sec = new Sector { Description = sectorDto.Description };
            await _context.Sectors.AddAsync(sec);
            await _context.SaveChangesAsync();

            return sec;
        }

        public async Task<Sector?> Delete(int id)
        {
            var sec = await _context.Sectors.FindAsync(id);

            if (sec == null)
                return null;

            _context.Sectors.Remove(sec);
            await _context.SaveChangesAsync();

            return sec;
        }

        public async Task<List<Sector>> GetAll()
        {
            return await _context.Sectors.Include(s => s.Companies).ToListAsync();
        }

        public async Task<Sector?> GetById(int id)
        {
            var sector = await _context.Sectors.Include(s => s.Companies).FirstOrDefaultAsync(s => s.Id == id);
            return sector == null ? null : sector;
        }

        public async Task<Sector?> Update(int id, SectorDto sectorDto)
        {
            var sec = await _context.Sectors.Include(s => s.Companies).FirstOrDefaultAsync(s => s.Id == id);

            if (sec == null)
                return null;

            sec.Description = sectorDto.Description;
            await _context.SaveChangesAsync();

            return sec;
        }
    }
}
