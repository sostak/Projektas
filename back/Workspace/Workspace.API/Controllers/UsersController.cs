using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Workspace.Core.Commands;
using Workspace.Core.Dto;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.API.Controllers
{
    public class UsersController : BaseController
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        public UsersController(IAuthService authService, IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetAll()
        {
            var users = await _authService.GetAllUsers();

            return Ok(users);
        }

        [HttpGet("GetMe")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> GetMe()
        {
            var user = await _authService.GetMe(UserId);

            return Ok(user);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<JwtDto>> Login([FromBody] LoginCommand command)
        {
            var user = await _authService.LoginAsync(command);
            var jwt = _jwtService.BuildJwt(user);

            return Ok(jwt);
        }
        [HttpPost("Register")]
        public async Task<ActionResult<UserResponseDto>> Register([FromBody] CreateUserRequestDto request)
        {
            var response = _authService.Register(request);

            return Ok(response);
        }

        private Guid UserId
        {
            get
            {
                try
                {
                    return Guid.Parse(User.FindFirstValue(ClaimTypes.Sid));
                }
                catch
                {
                    throw new InvalidOperationException(
                        $"Could not access user when there is no authorize attribute");
                }
            }
        }
    }
}
