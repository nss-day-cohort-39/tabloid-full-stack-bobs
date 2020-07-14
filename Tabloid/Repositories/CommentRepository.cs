using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetCommentsByPostId(int id)
        {
            return _context.Comment.Include(c => c.Post)
                            .Include(c => c.UserProfile)
                            .Where(c => c.PostId == id)
                            .OrderBy(c => c.CreateDateTime)
                            .ToList();
        }
    }
}
