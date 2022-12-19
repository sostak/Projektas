using Workspace.Domain.Models;

namespace Workspace.Infrastructure
{
    public static class DataContext
    {
        public static readonly List<Listing> Listings = new()
        {
            new Listing
            {
                id = "1",
                title = "BMW",
                image = "https://pfellas.lt/wp-content/uploads/2019/03/eng_pl_FRONT-SPLITTER-BMW-3-SERIES-F30-FL-SEDAN-M-SPORT-7025_7.jpg",
                categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Raudona"
                }
            },
            new Listing
            {
                id = "2",
                title = "BMW",
                image = "https://bmwtuning.co/wp-content/uploads/2020/08/BMW-F30-Buyers-Guide.png",
                categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Melyna"
                }
            },
            new Listing
            {
                id = "3",
                title = "BMW",
                image = "https://tuning.lt/image/cache/cache/1001-2000/1927/main/7ed6-bmw-f30-f31-priekinis-m-sport-buferis-bamperis-front-bumper-m-0-2-850x850.jpg",
                categories = new List<string>
                {
                    "fuel",
                    "year",
                    "Geltona"
                },
                values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Zalia"
                }
            },
            new Listing
            {
                id = "4",
                title = "BMW",
                image = "https://morendi.lt/wp-content/uploads/2020/05/rob_8061-scaled.jpg",
                categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Violetine"
                }
            },
            new Listing
            {
                id = "5",
                title = "BMW",
                image = "https://img.autogidas.lt/10_1_7352965/bmw-320-2012-2016.jpg",
                categories = new List<string>
                {
                    "fuel",
                    "year",
                    "color"
                },
                values = new List<string>
                {
                    "Benzinas",
                    "2018",
                    "Ruda"
                }
            }
        };
    }
}
