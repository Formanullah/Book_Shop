using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookSellApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookSellApp.API.Data
{
    public class BookingRepository : IBookingRepository
    {
        private readonly DataContext _context;

        public BookingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.Include(c =>c.Category).FirstOrDefaultAsync(x => x.Id == id);
           return book;
        }

        public async Task<IEnumerable<Book>> GetBooks(int categoryId)
        {
            if( categoryId != 0)
            {
                var books = await _context.Books.Where(c => c.CategoryId == categoryId).ToListAsync();
                return books;
            }
            else
            {
                var books = await _context.Books.ToListAsync();
                return books;
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> BookExists(string title)
        {
           if(await _context.Books.AnyAsync(x => x.Title == title))
           return true;

           return false;
        }

        public async Task<Book> AddBook(Book book)
        {
            await _context.Books.AddAsync(book); //save user
            await _context.SaveChangesAsync();//save changes back to the database
            return book;
        }

        public async Task<Category> Category(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
           var categories = await _context.Categories.Include(b => b.Books).ToListAsync();
            return categories;
        }

        public async Task<Order> CreateOrder(Order order)
        {
            await _context.Orders.AddAsync(order); //save user
            await _context.SaveChangesAsync();//save changes back to the database
            return order;
        }

        public async Task<IEnumerable<OrderDetails>> GetOrderDetails(int userId)
        {
            var orderDetails = await _context.OrderDetails.Include(o => o.Order).Include(b =>b.Book).Where( u => u.Order.UserId == userId).ToListAsync();
            return orderDetails;
        }
    }
}