namespace Workspace.Domain.Models
{
    public class Listing
    {
        public string id { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string price { get; set; }
        public string year { get; set; }
        public string fuel { get; set; }
        public string chassis { get; set; }
        public bool plugIn { get; set; }
        public string drivenWheels { get; set; }
        public string power { get; set; }
        public string engineCapacity { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string image { get; set; }
        public string description { get; set; }
        public List<string> categories { get; set; }
        public List<string> values { get; set; }
    }
}
