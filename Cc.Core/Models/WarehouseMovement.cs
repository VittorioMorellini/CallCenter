using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class WarehouseMovement
    {
        public long Id { get; set; }
        public long WarehouseIdFrom { get; set; }
        public long WarehouseIdTo { get; set; }
        public DateTime? MovementDate { get; set; }
        public long ProductId { get; set; }
        public int? Quantity { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? DeleteUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string? Notes { get; set; }

        public virtual Product Product { get; set; } = null!;
        public virtual Warehouse WarehouseIdFromNavigation { get; set; } = null!;
        public virtual Warehouse WarehouseIdToNavigation { get; set; } = null!;
    }
}
