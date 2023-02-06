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
            //pasidaryt metoduka stringui boolui ir intui i kuri paduoti car.value ir filter.value 
            var vehicles = await _vehicleRepository.GetVehicles();
            var filteredVehicles = vehicles.Where(car =>
               (string.IsNullOrWhiteSpace(filters.Make) || car.Make == filters.Make) &&
               (string.IsNullOrWhiteSpace(filters.Model) || car.Model == filters.Model) &&
               (filters.MinPrice == null || car.Price > filters.MinPrice) &&
               (filters.MaxPrice == null || car.Price < filters.MaxPrice) &&
               (filters.MinYear == null || car.Year > filters.MinYear) &&
               (filters.MaxYear == null || car.Year < filters.MaxYear) &&
               (string.IsNullOrWhiteSpace(filters.Fuel) || car.Fuel == filters.Fuel) &&
               (filters.BodyType == null || filters.BodyType.Count == 0 || filters.BodyType.Contains(car.BodyType)) &&
               (filters.PlugIn == null || filters.PlugIn == false || (filters.PlugIn == true && car.PlugIn == true)) &&
               (string.IsNullOrWhiteSpace(filters.DrivenWheels) || car.DrivenWheels == filters.DrivenWheels) &&
               (filters.MinPower == null || car.Power > filters.MinPower) &&
               (filters.MaxPower == null || car.Power < filters.MaxPower) &&
               (filters.MinEngineCapacity == null || car.EngineCapacity > filters.MinEngineCapacity) &&
               (filters.MaxEngineCapacity == null || car.EngineCapacity < filters.MaxEngineCapacity) &&
               (string.IsNullOrWhiteSpace(filters.Country) || car.Country == filters.Country) &&
               (string.IsNullOrWhiteSpace(filters.City) || car.City == filters.City) &&
               (filters.UserId == null || filters.UserId == car.UserId)).ToList();

            var vehiclesDto = new List<VehicleResponseDto>();
            foreach (var vehicle in filteredVehicles)
            {
                var vehicleDto = _mapper.Map<VehicleResponseDto>(vehicle);
                vehicleDto.PhoneNumber = vehicle.User.PhoneNumber;
                vehiclesDto.Add(vehicleDto);
            }
            return vehiclesDto;
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

        public VehicleResponseDto UpdateVehicle(UpdateVehicleRequestDto vehicleDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            var response = _vehicleRepository.UpdateVehicle(vehicle);
            var responseDto = _mapper.Map<VehicleResponseDto>(response);
            return responseDto;
        }
    }
}
