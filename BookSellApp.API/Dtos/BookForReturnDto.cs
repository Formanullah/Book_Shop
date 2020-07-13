namespace BookSellApp.API.Dtos
{
    public class BookForReturnDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string CategoryName { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
    }
}