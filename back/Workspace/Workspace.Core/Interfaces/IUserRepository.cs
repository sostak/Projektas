using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
        Task<User?> GetByEmailOrDefaultAsync(string email);
        Task<IEnumerable<User>> GetAllUsers();
        Task AddUser(User user);
        User UpdateUser(User user);
    }
}
