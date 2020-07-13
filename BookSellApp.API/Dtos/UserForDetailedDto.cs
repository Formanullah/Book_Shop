using System;
using System.Collections.Generic;
using BookSellApp.API.Models;

namespace BookSellApp.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string streetAddress { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}