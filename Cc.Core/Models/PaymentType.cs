using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PaymentType
    {
        public long Id { get; set; }
        public string? Description { get; set; }
        public bool IsDeferred { get; set; }
        public bool HasDeposit { get; set; }
    }
}
