using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Region
    {
        public Region()
        {
            InverseParent = new HashSet<Region>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long CompanyId { get; set; }
        public long? ParentId { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }

        public virtual Company Company { get; set; } = null!;
        public virtual Region? Parent { get; set; }
        public virtual ICollection<Region> InverseParent { get; set; }
    }
}
