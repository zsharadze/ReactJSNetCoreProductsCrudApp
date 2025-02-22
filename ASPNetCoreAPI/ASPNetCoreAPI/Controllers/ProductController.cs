using ASPNetCoreAPI.Data;
using ASPNetCoreAPI.Extensions;
using ASPNetCoreAPI.Infrastructure;
using ASPNetCoreAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASPNetCoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly ImageSaver _imageSaver;
        public ProductController(ILogger<ProductController> logger,
            ApplicationDbContext context, ImageSaver imageSaver)
        {
            _logger = logger;
            _context = context;
            _imageSaver = imageSaver;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApiResponseProducts), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProducts(int? pageSize, int? pageIndex)
        {
            var result = new ApiResponseProducts();
            PagerHelper pagerHelper = new PagerHelper(_context.Products.Count(), pageIndex.Value, pageSize.Value, "");
            result.Pager = pagerHelper.GetPager;
            result.ProductList = await _context.Products.Skip((pagerHelper.CurrentPage - 1) * pagerHelper.PageSize).Take(pagerHelper.PageSize).ToListAsync();
            result.Success = true;
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            product.Views++;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Ok(new ApiResponse() { Success = false, Message = "Error saving views count for product. " + ex.Message });
            }

            return Ok(product);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> AddProduct([FromForm] Product product)
        {
            if (string.IsNullOrEmpty(product.Title) || string.IsNullOrEmpty(product.Description) || product.ImageFile == null || product.ImageFile.Length == 0)
                return Ok(new ApiResponse() { Success = false, Message = "Fill necessary fields" });

            try
            {
                product.ImgName = await _imageSaver.SaveImage(product.ImageFile);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return Ok(new ApiResponse() { Success = true, Message = "Product successfully added" });
            }
            catch (Exception ex)
            {
                return Ok(new ApiResponse() { Success = false, Message = "Error when saving product. " + ex.Message });
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateProduct([FromForm] Product product)
        {
            if (product.ImageFile != null)
            {
                System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\imgs", product.ImgName));
                product.ImgName = await _imageSaver.SaveImage(product.ImageFile);
            }
            _context.Products.Update(product);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(new ApiResponse() { Success = true, Message = "Product successfully updated" });
            }
            catch (Exception ex)
            {
                return Ok(new ApiResponse() { Success = false, Message = "Error when updating product. " + ex.Message });
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var productToDelete = await _context.Products.FindAsync(id);
                _context.Products.Remove(productToDelete);
                await _context.SaveChangesAsync();
                if (!string.IsNullOrEmpty(productToDelete.ImgName))
                    System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\imgs", productToDelete.ImgName));
                return Ok(new ApiResponse() { Success = true, Message = "Product successfully deleted" });
            }
            catch (Exception ex)
            {
                return Ok(new ApiResponse() { Success = false, Message = "Error when deleting product. " + ex.Message });
            }
        }
    }
}
