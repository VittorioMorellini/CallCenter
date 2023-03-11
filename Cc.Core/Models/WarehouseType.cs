using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class WarehouseType
    {
        public WarehouseType()
        {
            Warehouse = new HashSet<Warehouse>();
        }

        public long Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Warehouse> Warehouse { get; set; }
    }
}
