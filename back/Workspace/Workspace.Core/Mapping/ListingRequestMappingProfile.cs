using AutoMapper;
using Workspace.Core.Requests;
using Workspace.Domain.Models;

namespace Workspace.Core.Mapping
{
    public class ListingRequestMappingProfile : Profile
    {
        public ListingRequestMappingProfile()
        {
            CreateMap<ListingRequestDto, Listing>();
        }
    }
}
