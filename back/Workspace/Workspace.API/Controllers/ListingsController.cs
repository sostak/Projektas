using Microsoft.AspNetCore.Mvc;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.API.Controllers
{
    public class ListingsController : BaseController
    {
        private IListingService _listingService;

        public ListingsController(IListingService listingService)
        {
            _listingService = listingService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_listingService.GetListings());
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(_listingService.GetListing(id));
        }
        [HttpGet("filter")]
        public IActionResult Get([FromQuery] Filters filters)
        {
            return Ok(_listingService.GetFilteredListings(filters));
        }
        [HttpPost]
        public Listing Post(Listing listing){
            Listing l = new Listing{
                Id = "7",
                Make = "Audi",
                Model = "RS7",
                Year = 2020,
                Price = 200,
                DrivenWheels = "4x4"  
            };
            _listingService.AddListing(l);
            System.Console.WriteLine(listing.Make);
            System.Console.WriteLine(listing.Model);
            System.Console.WriteLine(listing.Price);
            return l;
        }
    }
}
