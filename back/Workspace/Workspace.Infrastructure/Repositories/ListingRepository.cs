
using System.Security.Cryptography;
using System.Text;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure.Data;

namespace Workspace.Infrastructure.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly WorkspaceDbContext _dbContext;
        private static readonly Encoding HashEncoding = Encoding.UTF8;

        public ListingRepository(WorkspaceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Listing> GetListings()
        {
            var listings = _dbContext.Listings.ToList();
            return listings;
        }
        public void AddListing(Listing listing)
        {
            using var hmac = new HMACSHA512();

            listing.UserId = Guid.Parse("d8f2e20a-64a2-473f-8820-44a687c0d04b");
            listing.User = _dbContext.Users.Where(x => x.Id == Guid.Parse("d8f2e20a-64a2-473f-8820-44a687c0d04b")).FirstOrDefault();

            _dbContext.Listings.Add(listing);
            _dbContext.Users.Where(x => x.Id == Guid.Parse("d8f2e20a-64a2-473f-8820-44a687c0d04b")).FirstOrDefault().Listings.Add(listing);
            _dbContext.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _dbContext.Users.ToList();
        }
    }
}
