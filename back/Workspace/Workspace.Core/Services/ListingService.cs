using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure;

namespace Workspace.Core.Services
{
    public class ListingService : IListingService
    {
        public List<Listing> GetListings()
        {
            return DataContext.Listings;
        }

        public Listing GetListing(string id)
        {
            return DataContext.Listings.Where(listing => listing.id == id).FirstOrDefault();
        }
    }
}
