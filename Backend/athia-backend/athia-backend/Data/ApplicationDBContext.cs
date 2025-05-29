using athia_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace athia_backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Company>()
                .HasMany(c => c.Sectors)
                .WithMany(s => s.Companies)
                .UsingEntity<Dictionary<string, object>>(
                    "CompanySector",
                    j => j
                        .HasOne<Sector>()
                        .WithMany()
                        .HasForeignKey("SectorId")
                        .HasConstraintName("FK_CompanySector_Sector")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<Company>()
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .HasConstraintName("FK_CompanySector_Company")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("CompanyId", "SectorId");
                        j.ToTable("CompanySector");
                    });
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Sector> Sectors { get; set; }
    }
}
