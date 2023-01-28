using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleResponseDto>> GetVehicles();
        Task<VehicleResponseDto> GetVehicle(Guid id);
        Task<IEnumerable<VehicleResponseDto>> GetFilteredVehicles(Filters filters);
        Task<VehicleResponseDto> AddVehicle(CreateVehicleRequestDto vehicleDto, UserResponseDto user);
        void Delete();
    }
}
