using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Origin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Uri Url { get; set; }
        public int CharacterId { get; set; }

        [ForeignKey("CharacterId")]
        public Character Character { get; set; }
       
        
    }
}
