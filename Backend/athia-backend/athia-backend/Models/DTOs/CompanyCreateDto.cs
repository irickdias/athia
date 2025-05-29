namespace athia_backend.Models.DTOs
{
    public class CompanyCreateDto
    {
        public string SocialName { get; set; } = string.Empty;
        public string FantasyName { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
        public List<int> SectorIds { get; set; } = new();
    }
}
