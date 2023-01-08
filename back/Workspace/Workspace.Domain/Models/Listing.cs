namespace Workspace.Domain.Models
{
    public class Listing
    {
        public string Id { get; set; }
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
        public string? Image { get; set; }
        public List<string>? Images { get; set; }
        public string? Description { get; set; }
        public List<string>? Categories { get; set; }
        public List<string>? Values { get; set; }
        public string PhoneNumber { get; set; }
    }
}
