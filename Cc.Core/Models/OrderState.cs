using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class OrderState
    {
        public long Id { get; set; }
        public string Description { get; set; } = null!;
    }
}
