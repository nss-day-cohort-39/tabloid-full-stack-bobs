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
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionRepository _subscriptionRepository;
        public SubscriptionController(ApplicationDbContext context)
        {
            _subscriptionRepository = new SubscriptionRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpGet("getBySubscriberId/{id}")]
        public IActionResult GetSubscriptionsBySubscriberId(int id)
        {
            return Ok(_subscriptionRepository.GetSubscriptionsBySubscriberId(id));
        }

        [HttpGet("getByProviderId/{id}")]
        public IActionResult GetSubscriptionsByProviderId(int id)
        {
            return Ok(_subscriptionRepository.GetSubscriptionsByProviderId(id));
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.AddSubscription(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _subscriptionRepository.DeleteSubscription(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Subscription subscription)
        {
            if (id != subscription.Id)
            {
                return BadRequest();
            }

            _subscriptionRepository.Update(subscription);
            return NoContent();
        }
    }
}
