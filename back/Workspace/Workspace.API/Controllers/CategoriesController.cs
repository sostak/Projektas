using Microsoft.AspNetCore.Mvc;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.API.Controllers
{
    public class CategoriesController : BaseController
    {
        private ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet("makes")]
        public IActionResult GetMakes()
        {
            return Ok(_categoriesService.GetMake());
        }
        [HttpGet("models/{make}")]
        public IActionResult GetModels(string make)
        {
            return Ok(_categoriesService.GetModel(make));
        }
        [HttpGet("countries")]
        public IActionResult GetCountries()
        {
            return Ok(_categoriesService.GetCountries());
        }
        [HttpGet("cities/{country}")]
        public IActionResult GetCities(string country)
        {
            return Ok(_categoriesService.GetCities(country));
        }
    }
}
