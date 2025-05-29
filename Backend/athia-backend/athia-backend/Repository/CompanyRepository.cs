using athia_backend.Data;
using athia_backend.Interfaces;
using athia_backend.Models;
using athia_backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace athia_backend.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDBContext _context;

        public CompanyRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Company> Create(CompanyCreateDto companyDto)
        {
            var sectors = await _context.Sectors.Where(s => companyDto.SectorIds.Contains(s.Id)).ToListAsync();

            var company = new Company
            {
                SocialName = companyDto.SocialName,
                FantasyName = companyDto.FantasyName,
                Cnpj = companyDto.Cnpj,
                Sectors = sectors
            };

            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();

            return company;
        }

        public async Task<Company?> Delete(int id)
        {
            var comp = await _context.Companies.FindAsync(id);
            
            if (comp == null)
                return null;

            _context.Companies.Remove(comp);
            await _context.SaveChangesAsync();

            return comp;
        }

        public async Task<List<Company>> GetAll()
        {
            return await _context.Companies.Include(c => c.Sectors).ToListAsync();
        }

        public async Task<Company?> GetById(int id)
        {
            var company = await _context.Companies.Include(c => c.Sectors).FirstOrDefaultAsync(c => c.Id == id);
            return company == null ? null : company;
        }

        public async Task<Company?> Update(int id, CompanyCreateDto companyDto)
        {
            var comp = await _context.Companies.Include(c => c.Sectors).FirstOrDefaultAsync(c => c.Id == id);

            if (comp == null)
                return null;

            var sectors = await _context.Sectors.Where(s => companyDto.SectorIds.Contains(s.Id)).ToListAsync();

            comp.SocialName = companyDto.SocialName;
            comp.FantasyName = companyDto.FantasyName;
            comp.Cnpj = companyDto.Cnpj;
            comp.Sectors = sectors;

            await _context.SaveChangesAsync();

            return comp;
        }
    }
}
