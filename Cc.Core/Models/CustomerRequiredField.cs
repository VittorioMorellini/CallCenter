using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class CustomerRequiredField
    {
        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string InsertUser { get; set; } = null!;
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; } = null!;
        public long? CompanyId { get; set; }
        public long? AgencyId { get; set; }
        public long? ProductId { get; set; }
        public bool? Base { get; set; }
        public bool? Birth { get; set; }
        public bool? Identification { get; set; }

        public virtual Agency? Agency { get; set; }
        public virtual Company? Company { get; set; }
        public virtual Product? Product { get; set; }
    }
}
