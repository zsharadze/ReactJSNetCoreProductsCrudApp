using ASPNetCoreAPI.Extensions;

namespace ASPNetCoreAPI.Models
{
    public class ApiResponseProducts: ApiResponse
    {
        public List<Product> ProductList { get; set; }
        public Pager Pager { get; set; }
    }
}
