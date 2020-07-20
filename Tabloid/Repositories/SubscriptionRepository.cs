using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Subscription> GetAll()
        {
            return _context.Subscription
                            .Include(s => s.SubscriberUser)
                            .Include(s => s.ProviderUser)
                            .ToList();
        }
        public List<Subscription> GetSubscriptionsBySubscriberId(int id)
        {
            return _context.Subscription
                                .Include(s => s.SubscriberUser)
                                .Include(s => s.ProviderUser)
                                .Where(s => s.SubscriberUserProfileId == id)
                                .ToList();
        }

        public List<Subscription> GetSubscriptionsByProviderId(int id)
        {
            return _context.Subscription
                                .Include(s => s.SubscriberUser)
                                .Include(s => s.ProviderUser)
                                .Where(s => s.ProviderUserProfileId == id)
                                .ToList();
        }


        public Subscription GetById(int id)
        {
            return _context.Subscription
                            .FirstOrDefault(s => s.Id == id);
        }

        public void AddSubscription(Subscription subscription)
        {
            _context.Add(subscription);
            _context.SaveChanges();
        }

        public void DeleteSubscription(int id)
        {
            var subscription = GetById(id);
            _context.Subscription.Remove(subscription);
            _context.SaveChanges();
        }

        public void Update(Subscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
