using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cc.Core.Models
{
    public partial class Customer
    {
        [NotMapped]
        public string Error { get; set; }
    }
}
