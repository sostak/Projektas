namespace Workspace.Core.Interfaces
{
    public interface ICategoriesService
    {
        Task<IEnumerable<string>> GetMake();
        Task<IEnumerable<string>> GetModel(string make);
        Task<IEnumerable<string>> GetCountries();
        Task<IEnumerable<string>> GetCities(string country);
    }
}