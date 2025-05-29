using athia_backend.Interfaces;
using athia_backend.Models.DTOs;
using athia_backend.Models.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace athia_backend.Controllers
{
    [Route("api/sector")]
    [ApiController]
    public class SectorController : ControllerBase
    {
        private readonly ISectorRepository _repo;

        public SectorController(ISectorRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sectors = await _repo.GetAll();

            return Ok(sectors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var sector = await _repo.GetById(id);

            if (sector == null)
                return NotFound();

            return Ok(sector.ToSectorDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SectorDto sector)
        {
            var createdSector = await _repo.Create(sector);

            return CreatedAtAction(nameof(GetById), new { id = createdSector.Id }, createdSector.ToSectorDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] SectorDto sector)
        {
            var updatedSector = await _repo.Update(id, sector);

            if (updatedSector == null)
                return NotFound();

            return Ok(updatedSector);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var sectorModel = await _repo.Delete(id);

            if (sectorModel == null)
                return BadRequest("Setor não encontrado.");

            return NoContent();
        }


    }
}
