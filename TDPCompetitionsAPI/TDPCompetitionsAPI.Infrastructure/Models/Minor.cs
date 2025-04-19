using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TDPCompetitionsAPI.Infrastructure.Models
{
    public class Minor
    {
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public string AddressCity { get; set; } = string.Empty;

        public string AddressProvince { get; set; } = string.Empty;

        public string AddressStreet { get; set; } = string.Empty;

        public DateOnly BirthDate { get; set; }

        public string BirthCity { get; set; } = string.Empty;

        public string BirthProvince { get; set; } = string.Empty;

        public Gender Gender { get; set; }
        public Competitor Competitor { get; set; }
    }
}
