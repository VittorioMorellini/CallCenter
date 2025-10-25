using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class BroadcastingTabRegion
{
    public long Id { get; set; }

    public long BroadcastingId { get; set; }

    public long TabRegionId { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual Broadcasting Broadcasting { get; set; } = null!;

    public virtual TabRegion TabRegion { get; set; } = null!;
}
