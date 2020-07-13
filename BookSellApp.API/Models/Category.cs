using System.Collections.Generic;

namespace BookSellApp.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Categoryname { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}