using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Commission
    {
        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public double Percentage { get; set; }
    }
}
