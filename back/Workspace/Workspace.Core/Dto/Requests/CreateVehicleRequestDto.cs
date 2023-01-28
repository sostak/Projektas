using Workspace.Domain.Models;

namespace Workspace.Core.Dto.Requests
{
    public class CreateVehicleRequestDto
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public int Price { get; set; }
        public int? Year { get; set; }
        public string? Fuel { get; set; }
        public string? BodyType { get; set; }
        public bool? PlugIn { get; set; }
        public string? DrivenWheels { get; set; }
        public int? Power { get; set; }
        public int? EngineCapacity { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? ThumbnailBase64 { get; set; }
        public string? Description { get; set; }
        public List<string>? ImagesBase64 { get; set; }
    }
}
