using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PrincipalAuth
    {
        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long PrincipalId { get; set; }
        public long? AgencyId { get; set; }
        public string? UserPath { get; set; }
        public long? ProductId { get; set; }
        public long? CategoryId { get; set; }

        public virtual Agency? Agency { get; set; }
        public virtual Category? Category { get; set; }
        public virtual Principal Principal { get; set; } = null!;
        public virtual Product? Product { get; set; }
    }
}
