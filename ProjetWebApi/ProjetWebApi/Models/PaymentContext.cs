using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class PaymentContext : DbContext
    {
        public PaymentContext()
        {
        }

        public PaymentContext(DbContextOptions<PaymentContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetPayment> AspNetPayments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=.\\sqlexpress; database=APPDB; integrated security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "French_CI_AS");

            modelBuilder.Entity<AspNetPayment>(entity =>
            {
                entity.ToTable("AspNetPayment");

                entity.Property(e => e.Cvc)
                    .HasMaxLength(6)
                    .HasColumnName("cvc");

                entity.Property(e => e.Datecarte)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("datecarte");

                entity.Property(e => e.IdClient)
                    .IsRequired()
                    .HasMaxLength(450)
                    .HasColumnName("Id_Client");

                entity.Property(e => e.IdCommande).HasColumnName("Id_Commande");

                entity.Property(e => e.Numcarte)
                    .IsRequired()
                    .HasMaxLength(30)
                    .HasColumnName("numcarte");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
