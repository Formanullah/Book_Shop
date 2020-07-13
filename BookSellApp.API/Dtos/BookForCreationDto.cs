using System;
using Microsoft.AspNetCore.Http;

namespace BookSellApp.API.Dtos
{
    public class BookForCreationDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }
        public DateTime Created { get; set; }

        public BookForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}