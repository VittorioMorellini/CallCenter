using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Control
    {
        public Control()
        {
            RoleControl = new HashSet<RoleControl>();
        }

        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Page { get; set; }
        public string? Label { get; set; }
        public string? Descrption { get; set; }
        public bool Invisible { get; set; }
        public bool ReadOnly { get; set; }

        public virtual ICollection<RoleControl> RoleControl { get; set; }
    }
}
