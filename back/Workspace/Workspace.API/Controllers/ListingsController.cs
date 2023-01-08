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
            List<Listing> l = _listingService.GetListings();
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
    }
}
