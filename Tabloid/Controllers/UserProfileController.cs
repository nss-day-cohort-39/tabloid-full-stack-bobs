using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileRepository _userProfileRepository;
        public UserProfileController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult GetAllUserProfiles()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetUserProfileByUserId(int id)
        {
            return Ok(_userProfileRepository.GetByUserId(id));
        }

        [HttpGet("activeUsers")]
        public IActionResult GetActiveUsers()
        {
            return Ok(_userProfileRepository.GetActiveUsers());
        }

        [HttpGet("deactivatedUsers")]
        public IActionResult GetDeactivatedUsers()
        {
            return Ok(_userProfileRepository.GetDeactivatedUsers());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            userProfile.IsActive = true;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpDelete("{id}")]
        public IActionResult Deactivate(int id)
        {
            _userProfileRepository.DeactivateUserProfile(id);
            return NoContent();
        }

        [HttpPut("reactivateUser/{id}")]
        public IActionResult Reactivate(int id)
        {
            _userProfileRepository.ReactivateUserProfile(id);
            return NoContent();
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }
            _userProfileRepository.Update(userProfile);
            return NoContent();

        }
    }
}
