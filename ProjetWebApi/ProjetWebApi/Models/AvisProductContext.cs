using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AvisProductContext : DbContext
    {
        public AvisProductContext()
        {
        }

        public AvisProductContext(DbContextOptions<AvisProductContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetUsersAvisProduct> AspNetUsersAvisProducts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=.\\sqlexpress;database=APPDB;integrated security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "French_CI_AS");

            modelBuilder.Entity<AspNetUsersAvisProduct>(entity =>
            {
                entity.Property(e => e.IdClient)
                    .IsRequired()
                    .HasMaxLength(450)
                    .HasColumnName("Id_Client");

                entity.Property(e => e.IdProduit).HasColumnName("Id_Produit");

                entity.Property(e => e.Stars).HasColumnName("stars");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
