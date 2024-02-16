using Entities.BaseEntity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Character : Info
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Species { get; set; }
        public string Type { get; set; }
        public string Gender { get; set; }
        public Origin Origin { get; set; }
        // Name and link to character origin location
        public Location Location { get; set; }
        // Name and link to character last known location
        public string Image { get; set; }
        public virtual ICollection<Episode> Episodes { get; set; }
        public Uri Url { get; set; }
        public DateTime Created { get; set; }



    }
}
