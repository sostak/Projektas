using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IListingService
    {
        public List<Listing> GetListings();
        public Listing GetListing(string id);
        public List<Listing> GetFilteredListings(Filters filters);
        public void AddListing(Listing listing);
    }
}
