using AutoMapper;
using Workspace.Core.Interfaces;
using Workspace.Core.Dto.Requests;
using Workspace.Core.Dto.Responses;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUserRepository _userRepository;
        private readonly IImageService _imageService;

        public VehicleService(
            IMapper mapper,
            IVehicleRepository vehicleRepository,
            IUserRepository userRepository,
            IImageService imageService)
        {
            _mapper = mapper;
            _vehicleRepository = vehicleRepository;
            _userRepository = userRepository;
            _imageService = imageService;
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetVehicles()
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var vehiclesDto = new List<VehicleResponseDto>();
            foreach(var vehicle in vehicles)
            {
                var vehicleDto = _mapper.Map<VehicleResponseDto>(vehicle);

                if(vehicle.User == null)
                {
                    vehicle.User = await _userRepository.GetByIdAsync(vehicle.UserId);
                }

                vehicleDto.PhoneNumber = vehicle.User.PhoneNumber;
                vehiclesDto.Add(vehicleDto);
            }
            return vehiclesDto;
        }

        public async Task<VehicleResponseDto> GetVehicle(Guid id)
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var vehicle = vehicles.Where(v => v.Id == id).FirstOrDefault();
            if(vehicle != null)
            {
                var vehicleDto = _mapper.Map<VehicleResponseDto>(vehicle);
                vehicleDto.PhoneNumber = vehicle.User.PhoneNumber;
                vehicleDto.UserId = vehicle.UserId;
                return vehicleDto;
            }
            return null;
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetFilteredVehicles(Filters filters)
        {
            var vehicles = await _vehicleRepository.GetVehicles();
            var filteredVehicles = vehicles.Where(car =>
                  CheckFilter(filters.Make, car.Make) &&
                  CheckFilter(filters.Model, car.Model) &&
                  CheckFilter(filters.MinPrice, car.Price, (f, c) => f == null || c > f) &&
                  CheckFilter(filters.MaxPrice, car.Price, (f, c) => f == null || c < f) &&
                  CheckFilter(filters.MinYear, car.Year, (f, c) => f == null || c > f) &&
                  CheckFilter(filters.MaxYear, car.Year, (f, c) => f == null || c < f) &&
                  CheckFilter(filters.Fuel, car.Fuel) &&
                  CheckFilter(filters.BodyType, car.BodyType) &&
                  CheckFilter(filters.PlugIn, car.PlugIn, (f, c) => f == null || f == false || (f == true && c == true)) &&
                  CheckFilter(filters.DrivenWheels, car.DrivenWheels) &&
                  CheckFilter(filters.MinPower, car.Power, (f, c) => f == null || c > f) &&
                  CheckFilter(filters.MaxPower, car.Power, (f, c) => f == null || c < f) &&
                  CheckFilter(filters.MinEngineCapacity, car.EngineCapacity, (f, c) => f == null || c > f) &&
                  CheckFilter(filters.MaxEngineCapacity, car.EngineCapacity, (f, c) => f == null || c < f) &&
                  CheckFilter(filters.Country, car.Country) &&
                  CheckFilter(filters.City, car.City) &&
                  CheckFilter(filters.UserId, car.UserId) &&
                  CheckFilter(filters.IsActive, car.IsActive, (f, c) => f == null || f == false || (f == true && c == true)))
                  .ToList();

            var vehiclesDto = new List<VehicleResponseDto>();
            foreach (var vehicle in filteredVehicles)
            {
                var vehicleDto = _mapper.Map<VehicleResponseDto>(vehicle);
                vehicleDto.PhoneNumber = vehicle.User.PhoneNumber;
                vehiclesDto.Add(vehicleDto);
            }
            return vehiclesDto;
        }
        private static bool CheckFilter<T>(T filterValue, T carValue)
        {
            return filterValue == null || filterValue.Equals(carValue);
        }

        private static bool CheckFilter<T>(T filterValue, T carValue, Func<T, T, bool> customCheck)
        {
            return customCheck(filterValue, carValue);
        }

        public async Task<VehicleResponseDto> AddVehicle(CreateVehicleRequestDto vehicleDto, UserResponseDto user)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            vehicle.Id = Guid.NewGuid();
            vehicle.UserId = user.Id;
            vehicle.IsReserved = false;
            vehicle.IsActive = true;

            var images = new List<Image>();
            if(vehicleDto.ThumbnailBase64 != null)
            {
                var thumbnail = await _imageService.UploadImage(vehicleDto.ThumbnailBase64, vehicle, true);
                images.Add(thumbnail);
            }
            
            if(vehicleDto.ImagesBase64 != null)
            {
                foreach (string image in vehicleDto.ImagesBase64)
                {
                    var img = await _imageService.UploadImage(image, vehicle, false);
                    images.Add(img);
                }
            }

            await _vehicleRepository.AddVehicle(vehicle, images);
            var responseDto = _mapper.Map<VehicleResponseDto>(vehicle);
            responseDto.PhoneNumber = vehicle.User.PhoneNumber;
            responseDto.Images = _mapper.Map<List<ImageResponseDto>>(images);
            return responseDto;
        }
        public void Delete()
        {
            _vehicleRepository.Delete();
        }

        public async Task<VehicleResponseDto> UpdateVehicle(UpdateVehicleRequestDto vehicleDto, Guid UserId)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            var originalVehicle = await GetVehicle(vehicle.Id);
            if(originalVehicle.UserId != UserId)
            {
                throw new Exception("Permission denied");
            }

            var response = _vehicleRepository.UpdateVehicle(vehicle);
            var responseDto = _mapper.Map<VehicleResponseDto>(response);
            return responseDto;
        }
    }
}
