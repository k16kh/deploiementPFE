using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjetWebApi.Models;

namespace ProjetWebApi.Models
{
    public class AuthenticationContext:IdentityDbContext

    {
        public AuthenticationContext(DbContextOptions options):base(options)
           {
        }
        public DbSet<AppUsers>AppUsers { get; set; }
    }
}
