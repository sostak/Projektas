using System.Text.Json.Serialization;

namespace Workspace.Domain.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsThumbnail { get; set; }
        public Guid ListingId { get; set; }
        [JsonIgnore]
        public virtual Vehicle? Listing { get; set; }
    }
}
