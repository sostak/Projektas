namespace Workspace.Domain.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsThumbnail { get; set; }
        public Guid ListingId { get; set; }
        public virtual Listing? Listing { get; set; }
    }
}
