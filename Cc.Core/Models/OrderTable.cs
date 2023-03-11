using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class OrderTable
    {
        public OrderTable()
        {
            Event = new HashSet<Event>();
            OrderPayment = new HashSet<OrderPayment>();
        }

        public long Id { get; set; }
        public long AppointmentId { get; set; }
        public double? TotalAmount { get; set; }
        public long? VatId { get; set; }
        public double? NetAmount { get; set; }
        public long? CommissionId { get; set; }
        public double? CommissionAmount { get; set; }
        public long OrderStateId { get; set; }
        public string? Notes { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string? InvoiceNumber { get; set; }
        public string? Taxcode { get; set; }
        public string? Accountholder { get; set; }
        public string? Vatcode { get; set; }
        public double? Deposit { get; set; }
        public double? Balance { get; set; }

        public virtual ICollection<Event> Event { get; set; }
        public virtual ICollection<OrderPayment> OrderPayment { get; set; }
    }
}
