using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Workspace.Core.Interfaces;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.API.Controllers
{
    public class VehiclesController : BaseController
    {
        private IVehicleService _vehicleService;
        private IAuthService _authService;

        public VehiclesController(IVehicleService vehicleService, IAuthService authService)
        {
            _vehicleService = vehicleService;
            _authService = authService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_vehicleService.GetVehicles());
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Ok(_vehicleService.GetVehicle(id));
        }
        [HttpGet("filter")]
        public IActionResult Get([FromQuery] Filters filters)
        {
            return Ok(_vehicleService.GetFilteredVehicles(filters));
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<VehicleResponseDto> Post(CreateVehicleRequestDto vehicleDto) {
            var userDto = await _authService.GetMe(UserId);
            var vehicle = await _vehicleService.AddVehicle(vehicleDto, userDto);
            return vehicle;
        }
        [HttpDelete("DeleteAllVehicles")]
        public void Delete()
        {
            _vehicleService.Delete();
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
