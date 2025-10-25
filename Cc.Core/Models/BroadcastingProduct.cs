using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class BroadcastingProduct
{
    public long Id { get; set; }

    public long BroadcastingId { get; set; }

    public long ProductId { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual Broadcasting Broadcasting { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
