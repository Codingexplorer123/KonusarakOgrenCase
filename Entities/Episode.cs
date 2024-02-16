using Entities.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Episode : Info
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Air_date { get; set; }
        public string episode { get; set; }

        public virtual ICollection<Character> Characters { get; set; }
        public Uri Url { get; set; }
        public DateTime Created { get; set; }

    }
}
