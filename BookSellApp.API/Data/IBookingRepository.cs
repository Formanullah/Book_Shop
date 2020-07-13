using System.Collections.Generic;
using System.Threading.Tasks;
using BookSellApp.API.Models;

namespace BookSellApp.API.Data
{
    public interface IBookingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Book>> GetBooks(int  categoryId);
         Task<Book> GetBook(int id);
         Task<Book> AddBook(Book book);
         Task<bool> BookExists(string title);
         Task<Category> Category(Category category);
         Task<IEnumerable<Category>> GetCategories();
         Task<Order> CreateOrder(Order order);
         Task<IEnumerable<OrderDetails>> GetOrderDetails(int userId);
    }
}