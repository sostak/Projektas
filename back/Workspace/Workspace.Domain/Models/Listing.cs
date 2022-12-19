namespace Workspace.Domain.Models
{
    public class Listing
    {
        /*public string id { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public string year { get; set; }
        public string fuel { get; set; }*/
        public string id { get; set; }
        public string title { get; set; }
        public string image { get; set; }
        public List<string> categories { get; set; }
        public List<string> values { get; set; }
    }
}
