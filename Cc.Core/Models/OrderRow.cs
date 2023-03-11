using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class OrderRow
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public long MeasureId { get; set; }
        public long? WarehouseId { get; set; }
        public string? RegistrationNumber { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual Measure Measure { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
