using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Data.Configurations
{
    public class ListingConfiguration : IEntityTypeConfiguration<Listing>
    {
        public void Configure(EntityTypeBuilder<Listing> builder)
        {
            builder.HasOne(d => d.User)
                .WithMany(p => p.Listings)
                .HasForeignKey(d => d.UserId);
        }
    }
}
