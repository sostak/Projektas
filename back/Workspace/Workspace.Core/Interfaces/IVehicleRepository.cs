using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehicles();
        Task<Vehicle> AddVehicle(Vehicle vehicle, List<Image> images);
        void Delete();
    }
}
