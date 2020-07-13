using BookSellApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSellApp.API.Data
{
    public class DataContext : IdentityDbContext < User, Role, int, 
            IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
            IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions <DataContext> options) : base(options) { }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey( ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey( ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey( ur => ur.UserId)
                    .IsRequired();
            });


            builder.Entity<OrderDetails>()
                .HasKey(k => new {k.BookId, k.OrderId});

            builder.Entity<OrderDetails>()
                .HasOne(u => u.Book)
                .WithMany( u => u.Orders)
                .HasForeignKey(u => u.BookId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<OrderDetails>()
                .HasOne(u => u.Order)
                .WithMany( u => u.Books)
                .HasForeignKey(u => u.OrderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}