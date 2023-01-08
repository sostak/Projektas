using Workspace.Domain.Models;

namespace Workspace.Infrastructure
{
    public static class DataContext
    {
        public static readonly List<Listing> Listings = new()
        {
            new Listing
            {
                Id = "1",
                Make = "BMW",
                Model = "330E",
                Price = 24500,
                PlugIn = true,
                Image = "https://pfellas.lt/wp-content/uploads/2019/03/eng_pl_FRONT-SPLITTER-BMW-3-SERIES-F30-FL-SEDAN-M-SPORT-7025_7.jpg",
                Country = "Lietuva",
                City = "Kaunas",
                Description = "labai geras bemvas",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Raudona"
                }
            },
            new Listing
            {
                Id = "2",
                Make = "BMW",
                Model =  "520D",
                Country = "Latvija",
                City = "Ryga",
                Price =  15000,
                Image = "https://bmwtuning.co/wp-content/uploads/2020/08/BMW-F30-Buyers-Guide.png",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Melyna"
                }
            },
            new Listing
            {
                Id = "3",
                Make = "BMW",
                Model = "520D",
                Country = "Lietuva",
                City = "Kaunas",
                Price = 15000,
                Image = "https://www.cnet.com/a/img/resize/4e56e1c3b4362e5b3f4f4848bafc0f419e044bfe/hub/2020/12/18/1f726a6c-3144-468c-8bd3-e89c581f594e/bmwpromo.jpg?auto=webp&fit=crop&height=675&width=1200",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "Geltona"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Zalia"
                }
            },
            new Listing
            {
                Id = "4",
                Make = "BMW",
                Model = "520D",
                Price = 15000,
                Country = "Lietuva",
                City = "Kaunas",
                Fuel = "Benzinas",
                DrivenWheels = "Galiniai",
                Image = "https://morendi.lt/wp-content/uploads/2020/05/rob_8061-scaled.jpg",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Violetine"
                }
            },
            new Listing
            {
                Id = "5",
                Make = "BMW",
                Model = "335 Active Hybrid",
                Country = "Lietuva",
                City = "Kaunas",
                Price = 15000,
                Image = "https://img.autogidas.lt/10_1_7352965/bmw-320-2012-2016.jpg",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Ruda"
                }
            },
            new Listing
            {
                Id = "6",
                Make = "Volvo",
                Model = "V40",
                Price = 10000,
                DrivenWheels = "Priekiniai",
                Image = "https://mollerauto.lt/media/catalog/product/cache/9f50a19ae00c847d884be9f7ea7b58f4/d/4/d4806295c8d94b01d2da24ed8c6b98b9155f4da7e2d74798714e5fc5278ddb7d.jpeg",
                Categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                Values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Ruda"
                }
            }
        };
    }
}
