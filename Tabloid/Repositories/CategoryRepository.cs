using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;
using Microsoft.EntityFrameworkCore;

namespace Tabloid.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> GetAll()
        {
            return _context.Category.ToList();
        }

        public Category GetById(int Id)
        {
            return _context.Category
                       .FirstOrDefault(c => c.Id == Id);
        }

        public void Add(Category Category)
        {
            _context.Add(Category);
            _context.SaveChanges();
        }

        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category = GetById(id);
            _context.Category.Remove(category);
            _context.SaveChanges();
        }
    }
}
