using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Workspace.Core.Commands;
using Workspace.Core.Dto;
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<User>> GetMe()
        {
            var user = await _authService.GetMe(UserId);

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<JwtDto>> Login([FromBody] LoginCommand command)
        {
            var user = await _authService.LoginAsync(command);
            var jwt = _jwtService.BuildJwt(user);

            return Ok(jwt);
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
