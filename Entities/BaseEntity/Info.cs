using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.BaseEntity
{
    public class Info
    {
        public int Count { get; set; }
        public int Pages { get; set; }
        public Uri Next { get; set; }
        public Uri Prev { get; set; }
    }
}
