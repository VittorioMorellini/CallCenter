using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Investment
    {
        public long Id { get; set; }
        public long BroadcastingId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string? Type { get; set; }
        public double Amount { get; set; }
        public string? Description { get; set; }
        public long? ProductId { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? DeleteUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public long? CategoryId { get; set; }

        public virtual Broadcasting Broadcasting { get; set; } = null!;
        public virtual Category? Category { get; set; }
        public virtual Product? Product { get; set; }
    }
}
