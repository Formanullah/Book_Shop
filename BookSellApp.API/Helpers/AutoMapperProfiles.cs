using System.Linq;
using AutoMapper;
using BookSellApp.API.Dtos;
using BookSellApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<UserForRegisterDto, User>();
            CreateMap<BookForCreationDto, Book>();
            CreateMap<CategoryForReturnDto, Category>()
            .ForMember(dest => dest.Books, opt => opt.Ignore());
            CreateMap<Book, BookForReturnDto>()
            .ForMember(dest =>  dest.CategoryName, opt => {
                opt.MapFrom(src => src.Category.Categoryname);
            });
            CreateMap<OrderForCreationDto, Order>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<OrderDetails, OrderForReturnDto>()
            .ForMember(dest => dest.BookName,  opt => {
                opt.MapFrom(src => src.Book.Title);
            })
            .ForMember(dest => dest.OrderTime,  opt => {
                opt.MapFrom(src => src.Order.OrderTime);
            });


        }
        
    }
}