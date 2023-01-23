using Microsoft.AspNetCore.Mvc;
using Workspace.Core.Interfaces;
using Workspace.Core.Requests;
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
        public IActionResult Get(Guid id)
        {
            return Ok(_listingService.GetListing(id));
        }
        [HttpGet("filter")]
        public IActionResult Get([FromQuery] Filters filters)
        {
            return Ok(_listingService.GetFilteredListings(filters));
        }
        [HttpPost]
        public Listing Post(ListingRequestDto listingDto) {
            Listing listing = _listingService.AddListing(listingDto);
            return listing;
        }
        [HttpPost("/image")]
        public IActionResult PostPicture([FromBody]string image)
        {
            Console.WriteLine(image);
            return Ok();
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            return Ok(_listingService.GetUsers());
        }

    }
}
