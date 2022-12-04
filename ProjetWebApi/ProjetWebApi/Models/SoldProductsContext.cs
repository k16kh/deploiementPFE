using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class SoldProductsContext : DbContext
    {
        public SoldProductsContext()
        {
        }

        public SoldProductsContext(DbContextOptions<SoldProductsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetSoldProduct> AspNetSoldProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=.\\sqlexpress;database=APPDB; integrated security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "French_CI_AS");

            modelBuilder.Entity<AspNetSoldProduct>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.IdPharmacien)
                    .IsRequired()
                    .HasMaxLength(450)
                    .HasColumnName("id_Pharmacien");

                entity.Property(e => e.IdProduit).HasColumnName("id_Produit");

                entity.Property(e => e.Prix).HasColumnName("prix");

                entity.Property(e => e.Qte).HasColumnName("qte");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
