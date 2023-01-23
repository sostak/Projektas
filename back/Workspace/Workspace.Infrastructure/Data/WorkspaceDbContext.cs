using Microsoft.EntityFrameworkCore;
using Workspace.Domain.Models;
using Workspace.Infrastructure.Data.Configurations;

namespace Workspace.Infrastructure.Data
{
    public class WorkspaceDbContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }
        public DbSet<User> Users { get; set; }

        public WorkspaceDbContext(DbContextOptions<WorkspaceDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ListingConfiguration).Assembly);
        }
    }
}
