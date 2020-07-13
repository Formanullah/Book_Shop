using System;
using System.Collections.Generic;
using BookSellApp.API.Models;

namespace BookSellApp.API.Dtos
{
    public class OrderForCreationDto
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string streetAddress { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public DateTime OrderTime { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalPrice { get; set; }
        public int UserId { get; set; }
        public IEnumerable<BookInOrderDto> CartItems { get; set; }
        public OrderForCreationDto()
        {
            this.OrderTime = DateTime.Now;
        }
    }
}