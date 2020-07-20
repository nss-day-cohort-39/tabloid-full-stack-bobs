using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class UserTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public UserTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<UserType> GetAll()
        {
            return _context.UserType.ToList();
        }
    }
}
