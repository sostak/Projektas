using Firebase.Auth;
using Firebase.Storage;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;

namespace Workspace.Infrastructure.Services
{
    public class ImageService : IImageService
    {
        private string _firebaseStorageBucket = "workspace-b70e3.appspot.com";

        private Stream ConvertBase64ToStream(string imageFromRequest)
        {
            byte[] imageStringToBase64 = Convert.FromBase64String(imageFromRequest);
            StreamContent streamContent = new(new MemoryStream(imageStringToBase64));
            return streamContent.ReadAsStream();
        }

        private async Task<string> UploadImageToFirebase(Stream stream, string imageName)
        {
            CancellationTokenSource cancellationToken = new CancellationTokenSource();

            FirebaseStorageTask storageManager = new FirebaseStorage(
                                _firebaseStorageBucket,
                                new FirebaseStorageOptions
                                {
                                    ThrowOnCancel = true
                                })
                            .Child(imageName)
                            .PutAsync(stream, cancellationToken.Token);

            string imageFromFirebaseStorage;
            imageFromFirebaseStorage = await storageManager;

            return imageFromFirebaseStorage;
        }

        public async Task<Image> UploadImage(string image, Vehicle vehicle, bool isThumbnail)
        {
            var img = new Image();
            img.Id = Guid.NewGuid();
            img.ListingId = vehicle.Id;
            var imgStream = ConvertBase64ToStream(image);
            img.ImageUrl = await UploadImageToFirebase(imgStream, String.Format("{0}_{1}", vehicle.Id, img.Id));
            img.IsThumbnail = isThumbnail;
            return img;
        }
    }
}