using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cc.Core.Models
{
    public partial class Principal
    {
        [NotMapped]
        public string Token { get; set; }
        [NotMapped]
        public IEnumerable<long> AgencyIds { get; set; }
        [NotMapped]
        public int Appointments { get; set; }
    }
}
