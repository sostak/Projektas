using Workspace.Domain.Models;

namespace Workspace.Core.Dto.Responses
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public List<Vehicle> Listings { get; set; }
    }
}
