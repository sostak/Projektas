using Microsoft.EntityFrameworkCore;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure.Data;

namespace Workspace.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly WorkspaceDbContext _dbContext;

        public UserRepository(WorkspaceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            var user = await _dbContext.Users.FirstAsync(u => u.Id == id);

            return user;
        }

        public async Task<User?> GetByEmailOrDefaultAsync(string email)
        {
            var users = await _dbContext.Users.ToListAsync();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }
    }
}
