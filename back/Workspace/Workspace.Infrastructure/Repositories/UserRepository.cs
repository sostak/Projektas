using Microsoft.EntityFrameworkCore;
using System.Reflection;
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

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _dbContext.Users.ToListAsync();

            return users;
        }
        public async Task AddUser(User user)
        {
            await _dbContext.Users.AddAsync(user);
            _dbContext.SaveChanges();
        }

        public User UpdateUser(User user)
        {
            var originalUser = _dbContext.Users.Find(user.Id);

            _dbContext.Entry(originalUser).State = EntityState.Detached;

            PropertyInfo[] properties = typeof(User).GetProperties();
            foreach (var property in properties)
            {
                var value = property.GetValue(user);
                if (value != null)
                {
                    typeof(User).GetProperty(property.Name)?.SetValue(originalUser, value);
                }
            }

            _dbContext.Entry(originalUser).State = EntityState.Modified;
            _dbContext.SaveChanges();

            return originalUser;
        }
    }
}
