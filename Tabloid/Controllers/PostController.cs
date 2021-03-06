﻿using System;
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

        [HttpGet("getByCategory/{id}")]
        public IActionResult GetByCategoryId(int id)
        {
            return Ok(_postRepository.GetByCategoryId(id));
        }

        [HttpGet("getByCategoryByUser/{userId}/{categoryId}")]
        public IActionResult GetByCategoryIdByUserId(int userId, int categoryId)
        {
            return Ok(_postRepository.GetByCategoryIdByUserId(userId, categoryId));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }
    }
}
