using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PrincipalTabRegion
    {
        public long Id { get; set; }
        public long PrincipalId { get; set; }
        public long TabRegionId { get; set; }

        public virtual Principal Principal { get; set; } = null!;
        public virtual TabRegion TabRegion { get; set; } = null!;
    }
}
