using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Vat
    {
        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public string VatCode { get; set; } = null!;
        public double Rate { get; set; }
    }
}
