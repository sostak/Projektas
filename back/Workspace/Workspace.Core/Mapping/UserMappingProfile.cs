using AutoMapper;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.Core.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<CreateUserRequestDto, User>();
            CreateMap<User, UserResponseDto>();
        }
    }
}
