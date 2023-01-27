using Workspace.Core.Interfaces;

namespace Workspace.Infrastructure.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public CategoriesService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        async Task<IEnumerable<string>> ICategoriesService.GetMake()
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var makes = vehicles.Select(car => car.Make).Distinct().ToList();
            return makes;
        }

        async Task<IEnumerable<string>> ICategoriesService.GetModel(string make)
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var models = vehicles.Where(car => car.Make == make).Select(car => car.Model).Distinct().ToList();
            return models;
        }

        async Task<IEnumerable<string>> ICategoriesService.GetCountries()
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var countries = vehicles.Select(car => car.Country).Distinct().ToList();
            return countries;
        }

        async Task<IEnumerable<string>> ICategoriesService.GetCities(string country)
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var cities = vehicles.Where(car => car.Country == country).Select(car => car.City).Distinct().ToList();
            return cities;
        }
    }
}
