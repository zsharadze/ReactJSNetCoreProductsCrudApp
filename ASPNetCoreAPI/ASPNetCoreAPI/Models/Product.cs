using System.ComponentModel.DataAnnotations.Schema;

namespace ASPNetCoreAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Views { get; set; }
        public string ImgName { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set;}
    }
}
