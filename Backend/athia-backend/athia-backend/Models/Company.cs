using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace athia_backend.Models
{
    [Table("Companies")]
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string SocialName { get; set; } = string.Empty;

        public string FantasyName { get; set; } = string.Empty;

        [Required]
        [StringLength(14)]
        [Column(TypeName = "varchar(14)")]
        public string Cnpj { get; set; } = string.Empty;

        public ICollection<Sector> Sectors { get; set; } = new List<Sector>();

    }
}
