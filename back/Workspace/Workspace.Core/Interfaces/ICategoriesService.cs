using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface ICategoriesService
    {
        public List<string> GetMake();
        public List<string> GetModel(string make);
        public List<string> GetCountries();
        public List<string> GetCities(string country);
    }
}
