using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("getByUser/{id}")]
        public IActionResult GetByUserId(int id)
        {
            return Ok(_postRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_postRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }
    }
}
