using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Resident
    {
        public int Id { get; set; }
        public Uri Url { get; set; }
        public Location Location { get; set; }

    }
}
