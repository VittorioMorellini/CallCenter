using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Measure
    {
        public Measure()
        {
            OrderRow = new HashSet<OrderRow>();
        }

        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? DeleteUser { get; set; }
        public DateTime? DeleteDate { get; set; }

        public virtual ICollection<OrderRow> OrderRow { get; set; }
    }
}
