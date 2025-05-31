using athia_backend.Helpers;
using athia_backend.Models;

namespace athia_backend.Interfaces
{
    public interface IReportRepository
    {
        Task<PaginatedList<Company>> GetReport(QueryObject query);
    }
}
