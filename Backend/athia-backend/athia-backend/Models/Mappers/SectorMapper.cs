using athia_backend.Models.DTOs;

namespace athia_backend.Models.Mappers
{
    public static class SectorMapper
    {
        public static SectorDto ToSectorDto(this Sector sector)
        {
            return new SectorDto
            {
                Description = sector.Description
            };
        }
    }
}
