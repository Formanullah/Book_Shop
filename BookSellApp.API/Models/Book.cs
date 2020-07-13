using System;
using System.Collections.Generic;

namespace BookSellApp.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public DateTime Created { get; set; }
        public ICollection<OrderDetails> Orders { get; set; }


    }
}