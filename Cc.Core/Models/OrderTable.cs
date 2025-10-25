using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class OrderTable
{
    public long Id { get; set; }

    public long AppointmentId { get; set; }

    public double? TotalAmount { get; set; }

    public long? VatId { get; set; }

    public double? NetAmount { get; set; }

    public long? CommissionId { get; set; }

    public double? CommissionAmount { get; set; }

    public long OrderStateId { get; set; }

    public string? Notes { get; set; }

    public DateOnly? Date { get; set; }

    public DateOnly? InvoiceDate { get; set; }

    public string? InvoiceNumber { get; set; }

    public string? Taxcode { get; set; }

    public string? Accountholder { get; set; }

    public string? Vatcode { get; set; }

    public double? Deposit { get; set; }

    public double? Balance { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<Event> Event { get; set; } = new List<Event>();

    public virtual ICollection<OrderPayment> OrderPayment { get; set; } = new List<OrderPayment>();

    public virtual ICollection<OrderRow> OrderRow { get; set; } = new List<OrderRow>();

    public virtual OrderState OrderState { get; set; } = null!;
}
