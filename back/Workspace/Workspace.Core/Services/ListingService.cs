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
            return DataContext.Listings.Where(listing => listing.Id == id).FirstOrDefault();
        }
        public List<Listing> GetFilteredListings(Filters filters)
        {
            List<Listing> listings = DataContext.Listings.Where(car =>
               (string.IsNullOrWhiteSpace(filters.Make) || car.Make == filters.Make) &&
               (string.IsNullOrWhiteSpace(filters.Model) || car.Model == filters.Model) &&
               (filters.MinPrice == null || car.Price > filters.MinPrice) &&
               (filters.MaxPrice == null || car.Price < filters.MaxPrice) &&
               (filters.MinYear == null || car.Year > filters.MinYear) &&
               (filters.MaxYear == null || car.Year < filters.MaxYear) &&
               (string.IsNullOrWhiteSpace(filters.Fuel) || car.Fuel == filters.Fuel) &&
               (filters.BodyType == null || filters.BodyType.Count == 0 || filters.BodyType.Contains(car.BodyType)) &&
               (filters.PlugIn == null || filters.PlugIn == false || (filters.PlugIn == true && car.PlugIn == true)) &&
               (string.IsNullOrWhiteSpace(filters.DrivenWheels) || car.DrivenWheels == filters.DrivenWheels) &&
               (filters.MinPower == null || car.Power > filters.MinPower) &&
               (filters.MaxPower == null || car.Power < filters.MaxPower) &&
               (filters.MinEngineCapacity == null || car.EngineCapacity > filters.MinEngineCapacity) &&
               (filters.MaxEngineCapacity == null || car.EngineCapacity < filters.MaxEngineCapacity) &&
               (string.IsNullOrWhiteSpace(filters.Country) || car.Country == filters.Country) &&
               (string.IsNullOrWhiteSpace(filters.City) || car.City == filters.City)).ToList();
            Listing car = DataContext.Listings[0];
            return listings;
        }
        public void AddListing(Listing listing){
            DataContext.Listings.Add(listing);
        }
    }
}
