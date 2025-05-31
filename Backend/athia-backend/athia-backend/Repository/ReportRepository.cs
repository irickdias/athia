using athia_backend.Data;
using athia_backend.Helpers;
using athia_backend.Interfaces;
using athia_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace athia_backend.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDBContext _context;

        public ReportRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public Task<PaginatedList<Company>> GetReport(QueryObject query)
        {
            //var reportsQuery = _context.Companies.Include(c => c.Sectors).AsQueryable();
            throw new NotImplementedException();
        }
    }
}
