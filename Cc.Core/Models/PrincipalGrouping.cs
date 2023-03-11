using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class PrincipalGrouping
    {
        public long Id { get; set; }
        public long PrincipalId { get; set; }
        public long GroupingId { get; set; }
        public DateTime InsertDate { get; set; }
        public string InsertUser { get; set; } = null!;
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; } = null!;

        public virtual Grouping Grouping { get; set; } = null!;
        public virtual Principal Principal { get; set; } = null!;
    }
}
