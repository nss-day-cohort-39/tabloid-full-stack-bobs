using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly UserTypeRepository _userTypeRepository;
        public UserTypeController(ApplicationDbContext context)
        {
            _userTypeRepository = new UserTypeRepository(context);
        }

        [HttpGet]
        public IActionResult GetAllUserTypes()
        {
            return Ok(_userTypeRepository.GetAll());
        }
    }
}
