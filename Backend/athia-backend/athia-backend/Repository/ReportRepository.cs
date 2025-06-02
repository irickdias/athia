using System.Diagnostics;
using athia_backend.Data;
using athia_backend.Helpers;
using athia_backend.Interfaces;
using athia_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace athia_backend.Repository
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDBContext _context;

        public ReportRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<Company>> GetReport(QueryObject query)
        {
            var reportsQuery = _context.Companies.Include(c => c.Sectors).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.company))
                reportsQuery = reportsQuery.Where(c => c.SocialName.Contains(query.company));

            if (!string.IsNullOrWhiteSpace(query.sector))
                reportsQuery = reportsQuery.Where(c => c.Sectors.Any(s => s.Description.Contains(query.sector)));

            var reports = await reportsQuery.ToListAsync();

            var totalRecords = reports.Count;
            var totalPages = (int)Math.Ceiling(totalRecords / (double)query.pageSize);

            var skipNumber = (query.pageNumber - 1) * query.pageSize;
            var pagedDebts = reports.Skip(skipNumber).Take(query.pageSize).ToList();

            return new PaginatedList<Company>
            {
                totalPages = totalPages,
                totalRecords = totalRecords,
                data = reports
            };
        }
    }
}
