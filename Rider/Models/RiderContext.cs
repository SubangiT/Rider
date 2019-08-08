using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Rider.Models
{
    public partial class RiderContext : DbContext
    {
        public RiderContext()
        {
        }

        public RiderContext(DbContextOptions<RiderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<RiderDetails> RiderDetails { get; set; }
        public virtual DbSet<RiderJobs> RiderJobs { get; set; }
      

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-HU3VE6B\\SQLEXPRESS;Database=Rider;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RiderDetails>(entity =>
            {
                entity.ToTable("Rider_Details");

                entity.Property(e => e.Email)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<RiderJobs>(entity =>
            {
                entity.ToTable("Rider_Jobs");

                entity.Property(e => e.CompletedAt)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.DateTime).HasColumnType("datetime");

                entity.Property(e => e.ReviewComment)
                    .HasMaxLength(5000)
                    .IsUnicode(false);

                
            });
        }
    }
}
