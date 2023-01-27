using AutoMapper;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.Core.Mapping
{
    public class VehicleMappingProfile : Profile
    {
        public VehicleMappingProfile()
        {
            CreateMap<CreateVehicleRequestDto, Vehicle>();
            CreateMap<Vehicle, VehicleResponseDto>();
        }
    }
}
