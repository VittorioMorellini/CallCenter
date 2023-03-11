using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class TabRegion
    {
        public TabRegion()
        {
            BroadcastingTabRegion = new HashSet<BroadcastingTabRegion>();
            PrincipalTabRegion = new HashSet<PrincipalTabRegion>();
            TabDistrict = new HashSet<TabDistrict>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public string NationCode { get; set; } = null!;

        public virtual ICollection<BroadcastingTabRegion> BroadcastingTabRegion { get; set; }
        public virtual ICollection<PrincipalTabRegion> PrincipalTabRegion { get; set; }
        public virtual ICollection<TabDistrict> TabDistrict { get; set; }
    }
}
