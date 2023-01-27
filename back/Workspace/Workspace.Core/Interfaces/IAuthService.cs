using Workspace.Core.Commands;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IAuthService
    {
        Task<User> LoginAsync(LoginCommand login);
        Task<User> GetMe(Guid Id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<UserResponseDto> Register(CreateUserRequestDto request);
    }
}
