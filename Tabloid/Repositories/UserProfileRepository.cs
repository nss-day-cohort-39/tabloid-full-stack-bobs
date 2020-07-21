using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .OrderBy(up => up.DisplayName)
                .ToList();
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetByUserId(int id)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .FirstOrDefault(up => up.Id == id);
        }

        public List<UserProfile> GetActiveUsers()
        {
            return _context.UserProfile
               .Include(up => up.UserType)
               .Where(up => up.IsActive == true)
               .ToList();
        }

        public List<UserProfile> GetDeactivatedUsers()
        {
            return _context.UserProfile
               .Include(up => up.UserType)
               .Where(up => up.IsActive == false)
               .ToList();
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void DeactivateUserProfile(int id)
        {
            var profile = GetByUserId(id);
            profile.IsActive = false;
            _context.Entry(profile).Property("IsActive").IsModified = true;
            _context.SaveChanges();
        }

        public void ReactivateUserProfile(int id)
        {
            var profile = GetByUserId(id);
            profile.IsActive = true;
            _context.Entry(profile).Property("IsActive").IsModified = true;
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}