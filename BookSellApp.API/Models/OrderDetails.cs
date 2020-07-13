using System;
using System.Collections.Generic;

namespace BookSellApp.API.Models
{
    public class OrderDetails
    {
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalPrice { get; set; }
    }
}