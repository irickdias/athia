using athia_backend.Helpers;
using athia_backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace athia_backend.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _repo;

        public ReportController(IReportRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetReport([FromQuery] QueryObject query)
        {
            var reports = await _repo.GetReport(query);

            return Ok(reports);
        }
    }
}
