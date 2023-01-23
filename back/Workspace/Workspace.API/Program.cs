using Microsoft.EntityFrameworkCore;
using Workspace.Core.Interfaces;
using Workspace.Infrastructure.Data;
using Workspace.Infrastructure.Repositories;
using Workspace.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WorkspaceDbContext>(
    options =>
    {
        options.UseSqlite("Data Source=LocalDatabase.db", x => x.MigrationsAssembly("Workspace.Infrastructure"));
    });
builder.Services.AddScoped<IListingService, ListingService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<IListingRepository, ListingRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials()); // allow credentials

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
