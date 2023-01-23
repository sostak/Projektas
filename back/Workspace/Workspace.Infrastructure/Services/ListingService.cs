using AutoMapper;
using Workspace.Core.Interfaces;
using Workspace.Core.Requests;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Services
{
    public class ListingService : IListingService
    {
        private readonly IMapper _mapper;
        private readonly IListingRepository _repository;

        public ListingService(IMapper mapper, IListingRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public IEnumerable<Listing> GetListings()
        {
            var listings = _repository.GetListings();
            return listings;
        }

        public Listing GetListing(Guid id)
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
        public Listing AddListing(ListingRequestDto listingDto){
            Listing listing = _mapper.Map<Listing>(listingDto);
            listing.Id = Guid.NewGuid();
            _repository.AddListing(listing);

            return listing;
        }

        public IEnumerable<User> GetUsers()
        {
            return _repository.GetUsers();
        }
    }
}
