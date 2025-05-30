using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace athia_backend.Models
{
    [Table("Sectors")]
    public class Sector
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Description { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Company> Companies { get; set; } = new List<Company>();
    }
}
