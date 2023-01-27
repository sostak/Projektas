
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure.Data;

namespace Workspace.Infrastructure.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly WorkspaceDbContext _dbContext;
        private static readonly Encoding HashEncoding = Encoding.UTF8;

        public VehicleRepository(WorkspaceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            var vehicles = await _dbContext.Vehicles.ToListAsync();
            return vehicles;
        }

        public async Task<Vehicle> AddVehicle(Vehicle vehicle, List<Image> images)
        {
            await _dbContext.Vehicles.AddAsync(vehicle);
            await _dbContext.Images.AddRangeAsync(images);
            _dbContext.SaveChanges();

            return vehicle;
        }
        public void Delete()
        {
            foreach(var vehicle in _dbContext.Vehicles)
            {
                _dbContext.Remove(vehicle);
            }
            _dbContext.SaveChanges();
        }
    }
}
