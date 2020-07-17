using Microsoft.EntityFrameworkCore;
using Tabloid.Models;

namespace Tabloid.Data
{
        public class ApplicationDbContext : DbContext
        {
                public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

<<<<<<< HEAD
                public DbSet<UserProfile> UserProfile { get; set; }
                public DbSet<UserType> UserType { get; set; }
                public DbSet<Category> Category { get; set; }

                public DbSet<Tag> Tag { get; set; }
                public DbSet<Post> Post { get; set; }
                public DbSet<PostTag> PostTag { get; set; }
        }
}
=======
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<Comment> Comment { get; set; }
    }
}
>>>>>>> 897ddc597a903f7d14693c3415ad4608918b76f4
