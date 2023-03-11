using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PrincipalRole
    {
        public long Id { get; set; }
        public long PrincipalId { get; set; }
        public string Role { get; set; } = null!;

        public virtual Principal Principal { get; set; } = null!;
    }
}
