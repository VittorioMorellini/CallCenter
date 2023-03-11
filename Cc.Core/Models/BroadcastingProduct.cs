using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class BroadcastingProduct
    {
        public long Id { get; set; }
        public long BroadcastingId { get; set; }
        public long ProductId { get; set; }

        public virtual Broadcasting Broadcasting { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
