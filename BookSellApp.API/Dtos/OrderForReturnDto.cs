using System;

namespace BookSellApp.API.Dtos
{
    public class OrderForReturnDto
    {
        public int BookId { get; set; }
        public string BookName { get; set; }
        public int OrderId { get; set; }
        public DateTime OrderTime { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalPrice { get; set; }
    }
}