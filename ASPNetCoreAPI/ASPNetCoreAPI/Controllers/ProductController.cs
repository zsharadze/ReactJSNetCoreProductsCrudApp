using ASPNetCoreAPI.Data;
using ASPNetCoreAPI.Extensions;
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
        public ProductController(ILogger<ProductController> logger,
            ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ApiResponseProducts> GetProducts(int? pageSize, int? pageIndex)
        {
            var result = new ApiResponseProducts();
            PagerHelper pagerHelper = new PagerHelper(_context.Products.Count(), pageIndex.Value, pageSize.Value, "");
            result.Pager = pagerHelper.GetPager;
            result.ProductList = await _context.Products.Skip((pagerHelper.CurrentPage - 1) * pagerHelper.PageSize).Take(pagerHelper.PageSize).ToListAsync();
            result.Success = true;
            return result;
        }

        [HttpGet]
        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            product.Views++;
            await _context.SaveChangesAsync();
            return product;
        }

        [HttpPost]
        public async Task<ApiResponse> AddProduct([FromForm] Product product)
        {
            if (string.IsNullOrEmpty(product.Title) || string.IsNullOrEmpty(product.Description) || product.ImageFile == null || product.ImageFile.Length == 0)
                return new ApiResponse() { Success = false, Message = "Fill necessary fields" };

            try
            {
                product.ImgName = await SaveImage(product.ImageFile);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return new ApiResponse() { Success = true, Message = "Product successfully added" };
            }
            catch (Exception ex)
            {
                return new ApiResponse() { Success = false, Message = "Error when saving product. " + ex.Message };
            }
        }

        [HttpPut]
        public async Task<ApiResponse> UpdateProduct([FromForm] Product product)
        {
            if (product.ImageFile != null)
            {
                System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\imgs", product.ImgName));
                product.ImgName = await SaveImage(product.ImageFile);
            }
            _context.Products.Update(product);
            try
            {
                await _context.SaveChangesAsync();
                return new ApiResponse() { Success = true, Message = "Product successfully updated" };
            }
            catch (Exception ex)
            {
                return new ApiResponse() { Success = false, Message = "Error when updating product. " + ex.Message };
            }
        }

        [HttpDelete]
        public async Task<ApiResponse> DeleteProduct(int id)
        {
            try
            {
                var productToDelete = await _context.Products.FindAsync(id);
                _context.Products.Remove(productToDelete);
                await _context.SaveChangesAsync();
                if (!string.IsNullOrEmpty(productToDelete.ImgName))
                    System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\imgs", productToDelete.ImgName));
                return new ApiResponse() { Success = true, Message = "Product successfully deleted" };
            }
            catch (Exception ex)
            {
                return new ApiResponse() { Success = false, Message = "Error when deleting product. " + ex.Message };
            }
        }

        private async Task<string> SaveImage(IFormFile file)
        {
            var fileExt = Path.GetFileName(Path.GetExtension(file.FileName));
            var fileName = Guid.NewGuid().ToString() + fileExt; ;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\imgs", fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return fileName;
        }
    }
}
