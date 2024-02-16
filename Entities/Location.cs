using Entities.BaseEntity;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Location: Info
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Dimension { get; set; }
        public virtual ICollection<Resident>Residents { get; set; }
        //residents	array (urls)	List of character who have been last seen in the location.
        public Uri Url { get; set; }
        public DateTime Created { get; set; }

    }
}
