namespace Workspace.Domain.Models
{
    public class Filters
    {
        public string? Make { get; set; }
        public string? Model { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
        public int? MinYear { get; set; }
        public int? MaxYear { get; set; }
        public string? Fuel { get; set; }
        public List<string>? BodyType { get; set; }
        public bool? PlugIn { get; set; }
        public string? DrivenWheels { get; set; }
        public int? MinPower { get; set; }
        public int? MaxPower { get; set; }
        public int? MinEngineCapacity { get; set; }
        public int? MaxEngineCapacity { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public Guid? UserId { get; set; }
    }
}
