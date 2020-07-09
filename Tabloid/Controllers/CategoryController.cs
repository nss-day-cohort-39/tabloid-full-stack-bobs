using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
        }

        [HttpGet("{Id}")]
        public IActionResult GetById(int Id)
        {
            return Ok(_categoryRepository.GetById(Id));
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }
    }
}
