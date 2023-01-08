using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure;

namespace Workspace.Core.Services
{
    public class CategoriesService : ICategoriesService
    {
        public List<string> GetMake()
        {
            return DataContext.Listings.Select(car => car.Make).Distinct().ToList();
        }

        public List<string> GetModel(string make)
        {
            return DataContext.Listings.Where(car => car.Make == make).Select(car => car.Model).Distinct().ToList();
        }

        public List<string> GetCountries()
        {
            return DataContext.Listings.Select(car => car.Country).Distinct().ToList();
        }

        public List<string> GetCities(string country)
        {
            return DataContext.Listings.Where(car => car.Country == country).Select(car => car.City).Distinct().ToList();
        }
    }
}
