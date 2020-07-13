using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BookSellApp.API.Data;
using BookSellApp.API.Dtos;
using BookSellApp.API.Helpers;
using BookSellApp.API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BookSellApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BookController : ControllerBase
    {
        private readonly IBookingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public BookController(IBookingRepository repo, IMapper mapper,
         IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpPost("addbook")]
        public async Task<IActionResult> AddBook([FromForm]BookForCreationDto bookForCreationDto)
        {
            //bookForCreationDto.Title = bookForCreationDto.Title.ToLower();

            if (await _repo.BookExists(bookForCreationDto.Title))
                return BadRequest("Book Name already Exist");

            var file = bookForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                        .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            bookForCreationDto.PhotoUrl = uploadResult.Uri.ToString();
            bookForCreationDto.PublicId = uploadResult.PublicId;
            //var userToCreate = new User { Username = userForRegisterDto.Username };
            var bookToCreate = _mapper.Map<Book>(bookForCreationDto);

            var createdbook = await _repo.AddBook(bookToCreate);

            return CreatedAtRoute("GetBook", new{Controller = "book", id =createdbook.Id}, createdbook);
        }

        [HttpGet("books/{categoryId}")]
        public async Task<IActionResult> GetBooks(int categoryId)
        {
            var books = await _repo.GetBooks(categoryId);
            return Ok(books);
        }
        [HttpGet("{id}", Name="GetBook")]
        public async Task<IActionResult> GetBook(int id) 
        {
            var book = await _repo.GetBook(id);
            var bookToReturn = _mapper.Map<BookForReturnDto>(book);
            
            return Ok(bookToReturn);
        }

        [HttpPost("category")]
        public async Task<IActionResult> AddCategory(Category category)
        {
            var createdcat = await _repo.Category(category);
            return Ok(createdcat);
        }
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _repo.GetCategories();
            var categoryToReturn = _mapper.Map<IEnumerable<CategoryForReturnDto>>(categories);
            return Ok(categories);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderForCreationDto orderForCreationDto)
        {
            var order = _mapper.Map<Order>(orderForCreationDto);
            var createdOrder = await _repo.CreateOrder(order);

            var cartItems = orderForCreationDto.CartItems;
            foreach (var item in cartItems)
            {
                var orderDetail = new OrderDetails();
                orderDetail.BookId = item.Id;
                orderDetail.OrderId = createdOrder.Id;
                orderDetail.TotalPrice = item.TotalPrice;
                orderDetail.TotalQuantity = item.TotalQuantity;
                _repo.Add(orderDetail);
                
            }
            await _repo.SaveAll();
            return Ok(createdOrder);

        }

        [HttpGet("orderdetails/{userId}")]
        public async Task<IActionResult> OrderDetails(int userId)
        {
            /* if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized(); */
            var orderDetails = await _repo.GetOrderDetails(userId);
            var orderToReturn = _mapper.Map<IEnumerable<OrderForReturnDto>>(orderDetails);
            return Ok(orderToReturn);
        }

        
        /* [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFrormRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto,userFrormRepo);

            if(await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        } */
    }
}