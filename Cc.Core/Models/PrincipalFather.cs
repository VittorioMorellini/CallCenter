using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PrincipalFather
    {
        public long Id { get; set; }
        public long? PrincipalId { get; set; }
        public long? FatherId { get; set; }

        public virtual Principal? Father { get; set; }
        public virtual Principal? Principal { get; set; }
    }
}
