using System;
using System.Collections.Generic;

namespace BookSellApp.API.Models
{
    public class Order
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string streetAddress { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public DateTime OrderTime { get; set; }
        public ICollection<OrderDetails> Books { get; set; }

        
    }
}