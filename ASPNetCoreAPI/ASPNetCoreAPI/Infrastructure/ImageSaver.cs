namespace ASPNetCoreAPI.Infrastructure
{
    public class ImageSaver
    {
        public async Task<string> SaveImage(IFormFile file)
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
