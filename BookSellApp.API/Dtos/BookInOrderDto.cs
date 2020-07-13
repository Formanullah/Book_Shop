using System;

namespace BookSellApp.API.Dtos
{
    public class BookInOrderDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime Created { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalPrice { get; set; }
        
    }
}