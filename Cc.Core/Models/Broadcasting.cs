using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Broadcasting
    {
        public Broadcasting()
        {
            BroadcastingProduct = new HashSet<BroadcastingProduct>();
            BroadcastingTabRegion = new HashSet<BroadcastingTabRegion>();
            Customer = new HashSet<Customer>();
            Investment = new HashSet<Investment>();
        }

        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? AuthorityName { get; set; }
        public string? AuthorityData { get; set; }
        public string? Notes { get; set; }

        public virtual ICollection<BroadcastingProduct> BroadcastingProduct { get; set; }
        public virtual ICollection<BroadcastingTabRegion> BroadcastingTabRegion { get; set; }
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Investment> Investment { get; set; }
    }
}
