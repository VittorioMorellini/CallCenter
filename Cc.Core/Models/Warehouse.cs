using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Warehouse
    {
        public Warehouse()
        {
            WarehouseMovementWarehouseIdFromNavigation = new HashSet<WarehouseMovement>();
            WarehouseMovementWarehouseIdToNavigation = new HashSet<WarehouseMovement>();
        }

        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public long? SalesmanId { get; set; }
        public long? WarehouseTypeId { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual Principal? Salesman { get; set; }
        public virtual WarehouseType? WarehouseType { get; set; }
        public virtual ICollection<WarehouseMovement> WarehouseMovementWarehouseIdFromNavigation { get; set; }
        public virtual ICollection<WarehouseMovement> WarehouseMovementWarehouseIdToNavigation { get; set; }
    }
}
