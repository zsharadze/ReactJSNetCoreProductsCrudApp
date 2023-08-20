using ASPNetCoreAPI.Data;
using ASPNetCoreAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNetCoreAPI.Infrastructure
{
    public static class SeederExtension
    {
        public static IHost SeedDatabase<TContext>(this IHost host) where TContext : ApplicationDbContext
        {
            //Create a scope to get scoped services.
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<TContext>();
                context.Database.Migrate();

                if (!context.Products.Any())
                {
                    Random random = new Random();

                    //insert products
                    var product1 = new Product();
                    product1.Title = "Product 1";
                    product1.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product1.Price = random.Next(10, 121);
                    product1.ImgName = "product1.png";
                    context.Products.Add(product1);

                    var product2 = new Product();
                    product2.Title = "Product 2";
                    product2.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product2.Price = random.Next(10, 121);
                    product2.ImgName = "product2.png";
                    context.Products.Add(product2);

                    var product3 = new Product();
                    product3.Title = "Product 3";
                    product3.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product3.Price = random.Next(10, 121);
                    product3.ImgName = "product3.png";
                    context.Products.Add(product3);

                    var product4 = new Product();
                    product4.Title = "Product 4";
                    product4.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product4.Price = random.Next(10, 121);
                    product4.ImgName = "product4.png";
                    context.Products.Add(product4);

                    var product5 = new Product();
                    product5.Title = "Product 5";
                    product5.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product5.Price = random.Next(10, 121);
                    product5.ImgName = "product5.png";
                    context.Products.Add(product5);

                    var product6 = new Product();
                    product6.Title = "Product 6";
                    product6.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product6.Price = random.Next(10, 121);
                    product6.ImgName = "product6.png";
                    context.Products.Add(product6);

                    var product7 = new Product();
                    product7.Title = "Product 7";
                    product7.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product7.Price = random.Next(10, 121);
                    product7.ImgName = "product7.png";
                    context.Products.Add(product7);

                    var product8 = new Product();
                    product8.Title = "Product 8";
                    product8.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product8.Price = random.Next(10, 121);
                    product8.ImgName = "product8.png";
                    context.Products.Add(product8);

                    var product9 = new Product();
                    product9.Title = "Product 9";
                    product9.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product9.Price = random.Next(10, 121);
                    product9.ImgName = "product9.png";
                    context.Products.Add(product9);

                    var product10 = new Product();
                    product10.Title = "Product 10";
                    product10.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product10.Price = random.Next(10, 121);
                    product10.ImgName = "product10.png";
                    context.Products.Add(product10);

                    var product11 = new Product();
                    product11.Title = "Product 11";
                    product11.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product11.Price = random.Next(10, 121);
                    product11.ImgName = "product11.png";
                    context.Products.Add(product11);

                    var product12 = new Product();
                    product12.Title = "Product 12";
                    product12.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product12.Price = random.Next(10, 121);
                    product12.ImgName = "product12.png";
                    context.Products.Add(product12);

                    var product13 = new Product();
                    product13.Title = "Product 13";
                    product13.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product13.Price = random.Next(10, 121);
                    product13.ImgName = "product13.png";
                    context.Products.Add(product13);

                    var product14 = new Product();
                    product14.Title = "Product 14";
                    product14.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product14.Price = random.Next(10, 121);
                    product14.ImgName = "product14.png";
                    context.Products.Add(product14);

                    var product15 = new Product();
                    product15.Title = "Product 15";
                    product15.Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.";
                    product15.Price = random.Next(10, 121);
                    product15.ImgName = "product15.png";
                    context.Products.Add(product15);

                    context.SaveChanges();
                }

            }

            return host;
        }
    }
}