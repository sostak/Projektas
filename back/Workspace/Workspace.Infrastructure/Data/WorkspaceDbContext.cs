using Microsoft.EntityFrameworkCore;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Data
{
    public class WorkspaceDbContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; } = null;

        public WorkspaceDbContext(DbContextOptions<WorkspaceDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
