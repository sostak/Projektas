using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
        Task<User?> GetByEmailOrDefaultAsync(string email);
    }
}
