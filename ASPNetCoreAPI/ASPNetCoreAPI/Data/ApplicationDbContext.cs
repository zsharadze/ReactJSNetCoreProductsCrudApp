using ASPNetCoreAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection;

namespace ASPNetCoreAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
