using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IImageService
    {
        Task<Image> UploadImage(string image, Vehicle vehicle, bool isThumbnail);
    }
}