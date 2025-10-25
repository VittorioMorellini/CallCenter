using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class Product
{
    public long Id { get; set; }

    public string Description { get; set; } = null!;

    public double Price { get; set; }

    public string Code { get; set; } = null!;

    public long CompanyId { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public long? CategoryId { get; set; }

    public virtual ICollection<BroadcastingProduct> BroadcastingProduct { get; set; } = new List<BroadcastingProduct>();

    public virtual Category? Category { get; set; }

    public virtual Company Company { get; set; } = null!;

    public virtual ICollection<Customer> Customer { get; set; } = new List<Customer>();

    public virtual ICollection<CustomerRequiredField> CustomerRequiredField { get; set; } = new List<CustomerRequiredField>();

    public virtual ICollection<Investment> Investment { get; set; } = new List<Investment>();

    public virtual ICollection<OrderRow> OrderRow { get; set; } = new List<OrderRow>();

    public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; } = new List<PrincipalAuth>();

    public virtual ICollection<WarehouseMovement> WarehouseMovement { get; set; } = new List<WarehouseMovement>();
}
