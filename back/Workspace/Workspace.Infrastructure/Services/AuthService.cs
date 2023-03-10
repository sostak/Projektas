using AutoMapper;
using System.Security.Cryptography;
using System.Text;
using Workspace.Core.Commands;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private record HashPasswordResponse(byte[] PasswordHash, byte[] PasswordSalt);
        private static readonly Encoding HashEncoding = Encoding.UTF8;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
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

        public async Task<UserResponseDto> GetMe(Guid Id)
        {
            var user = await _userRepository.GetByIdAsync(Id);
            var userResponse = _mapper.Map<UserResponseDto>(user);
            return userResponse;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            var usersResponse = _mapper.Map<List<UserResponseDto>>(users);
            return usersResponse;
        }

        public async Task<UserResponseDto> Register(CreateUserRequestDto request)
        {
            var user = _mapper.Map<User>(request);
            user.Id = Guid.NewGuid();
            var password = HashPassword(request.Password);
            user.PasswordSalt = password.PasswordSalt;
            user.PasswordHash = password.PasswordHash;
            user.Listings = new List<Vehicle>();
            await _userRepository.AddUser(user);

            var userDto = _mapper.Map<UserResponseDto>(user);
            return userDto;
        }

        public UserResponseDto Update(UpdateUserRequestDto request, Guid id)
        {
            var user = _mapper.Map<User>(request);
            user.Id = id;
            if(request.Password != null)
            {
                var password = HashPassword(request.Password);
                user.PasswordSalt = password.PasswordSalt;
                user.PasswordHash = password.PasswordHash;
            }
            var response = _userRepository.UpdateUser(user);
            var responseDto = _mapper.Map<UserResponseDto>(response);
            return responseDto;
        }

        public async Task<bool> CheckPassword(string password, Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(HashEncoding.GetBytes(password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
            {
                return false;
            }
            return true;
        }
    }
}
