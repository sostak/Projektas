using Workspace.Core.Commands;
using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IAuthService
    {
        Task<User> LoginAsync(LoginCommand login);
        Task<User> GetMe(Guid Id);
    }
}
