using athia_backend.Interfaces;
using athia_backend.Models.DTOs;
using athia_backend.Models.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace athia_backend.Controllers
{
    [Route("api/company")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _repo;

        public CompanyController(ICompanyRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companies = await _repo.GetAll();

            return Ok(companies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var company = await _repo.GetById(id);

            if (company == null)
                return NotFound();

            return Ok(company);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompanyCreateDto company)
        {
            var createdCompany = await _repo.Create(company);

            return CreatedAtAction(nameof(GetById), new { id = createdCompany.Id }, createdCompany.ToCompanyDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CompanyCreateDto company)
        {
            var updatedCompany = await _repo.Update(id, company);

            if (updatedCompany == null)
                return NotFound();

            return Ok(updatedCompany.ToCompanyDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var companyModel = await _repo.Delete(id);

            if (companyModel == null)
                return BadRequest("Empresa não encontrado.");

            return NoContent();
        }
    }
}
