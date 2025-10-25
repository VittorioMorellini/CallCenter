using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class Broadcasting
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public string? AuthorityName { get; set; }

    public string? AuthorityData { get; set; }

    public string? Notes { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<BroadcastingProduct> BroadcastingProduct { get; set; } = new List<BroadcastingProduct>();

    public virtual ICollection<BroadcastingTabRegion> BroadcastingTabRegion { get; set; } = new List<BroadcastingTabRegion>();

    public virtual ICollection<Customer> Customer { get; set; } = new List<Customer>();

    public virtual ICollection<Investment> Investment { get; set; } = new List<Investment>();
}
