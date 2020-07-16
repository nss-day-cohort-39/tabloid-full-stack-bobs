using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class TagRepository
    {
        private readonly ApplicationDbContext _context;
        private string _connectionString;

        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> GetAll()
        {
            return _context.Tag.OrderBy(c => c.Name).ToList();
        }

        public Tag GetById(int Id)
        {
            return _context.Tag
                       .FirstOrDefault(c => c.Id == Id);
        }

        public void Add(Tag Tag)
        {
            _context.Add(Tag);
            _context.SaveChanges();
        }

        public void Update(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM PostTag WHERE TagId = @id;
                        DELETE FROM Tag WHERE Id = @id;
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
