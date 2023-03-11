using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class OrderPayment
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public DateTime? DueDate { get; set; }
        public double? Amount { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual OrderTable Order { get; set; } = null!;
    }
}
