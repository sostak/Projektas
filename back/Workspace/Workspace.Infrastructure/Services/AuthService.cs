using System.Security.Cryptography;
using System.Text;
using Workspace.Core.Commands;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private record HashPasswordResponse(byte[] PasswordHash, byte[] PasswordSalt);
        private static readonly Encoding HashEncoding = Encoding.UTF8;
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        private HashPasswordResponse HashPassword(string password)
        {
            using var hmac = new HMACSHA512();

            var response = new HashPasswordResponse(
                PasswordSalt: hmac.Key,
                PasswordHash: hmac.ComputeHash(HashEncoding.GetBytes(password))
            );

            return response;
        }

        public async Task<User> LoginAsync(LoginCommand login)
        {
            var user = await _userRepository.GetByEmailOrDefaultAsync(login.Email);

            if (user is null)
            {
                throw new Exception("Incorrect user email");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(HashEncoding.GetBytes(login.Password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
            {
                throw new Exception("Incorrect user password");
            }

            return user;
        }

        public async Task<User> GetMe(Guid Id)
        {
            return await _userRepository.GetByIdAsync(Id);
        }
    }
}
