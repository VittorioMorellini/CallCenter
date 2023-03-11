using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class TabDistrict
    {
        public TabDistrict()
        {
            Customer = new HashSet<Customer>();
            TabCity = new HashSet<TabCity>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long TabRegionId { get; set; }
        public string Code { get; set; } = null!;
        public string? IstatCode { get; set; }
        public string? Description { get; set; }

        public virtual TabRegion TabRegion { get; set; } = null!;
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<TabCity> TabCity { get; set; }
    }
}
