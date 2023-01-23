using Workspace.Core.Requests;
using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IListingService
    {
        public IEnumerable<Listing> GetListings();
        public Listing GetListing(Guid id);
        public List<Listing> GetFilteredListings(Filters filters);
        public Listing AddListing(ListingRequestDto listingDto);
        IEnumerable<User> GetUsers();
    }
}
