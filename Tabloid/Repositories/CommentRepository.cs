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
                            .OrderByDescending(c => c.CreateDateTime)
                            .ToList();
        }

        public void AddComment(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void DeleteComment(int id)
        {
            var comment = _context.Comment.FirstOrDefault(c => c.Id == id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();

        }
    }
}
