using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using System;


namespace Tabloid.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAll()
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.PublishDateTime < DateTime.Now && p.IsApproved)
                            .OrderByDescending(p => p.PublishDateTime)
                            .ToList();
        }
        
            
     

        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Post.Include(p => p.UserProfile)
                                .Include(p => p.Category)
                                .Where(p => p.UserProfileId == id)
                                .OrderByDescending(p => p.CreateDateTime)
                                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .FirstOrDefault(p => p.Id == id);
        }

        public void AddPost(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }


    }
}
