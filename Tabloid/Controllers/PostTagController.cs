using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly PostTagRepository _postTagRepository;
        public PostTagController(ApplicationDbContext context)
        {
            _postTagRepository = new PostTagRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postTagRepository.GetAll());
        }

        [HttpGet("getByPost/{id}")]
        public IActionResult GetTagsByPostId(int id)
        {
            return Ok(_postTagRepository.GetTagsByPostId(id));
        }

        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.AddPostTag(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.DeletePostTag(id);
            return NoContent();
        }
    }
}