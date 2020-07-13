using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using System;


namespace Tabloid.Repositories
{
    public class PostTagRepository
    {
        private readonly ApplicationDbContext _context;

        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetAll()
        {
            return _context.PostTag
                            .Include(pt => pt.Tag)
                            .Include(pt => pt.Post)
                            .ToList();
        }




        public List<PostTag> GetTagsByPostId(int id)
        {
            return _context.PostTag.Include(pt => pt.Tag)
                                .Where(pt => pt.PostId == id)
                                .ToList();
        }

        public PostTag GetById(int id)
        {
            return _context.PostTag
                            .FirstOrDefault(p => p.Id == id);
        }

        public void AddPostTag(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }

        public void DeletePostTag(int id)
        {
            var postTag = GetById(id);
            _context.PostTag.Remove(postTag);
            _context.SaveChanges();
        }


    }
}
