using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class WarehouseType
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<Warehouse> Warehouse { get; set; } = new List<Warehouse>();
}
