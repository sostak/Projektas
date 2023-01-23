using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IListingRepository
    {
        IEnumerable<Listing> GetListings();
        IEnumerable<User> GetUsers();
        void AddListing(Listing listing);

    }
}
