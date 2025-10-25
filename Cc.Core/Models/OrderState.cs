using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class OrderState
{
    public long Id { get; set; }

    public string Description { get; set; } = null!;

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<OrderTable> OrderTable { get; set; } = new List<OrderTable>();
}
