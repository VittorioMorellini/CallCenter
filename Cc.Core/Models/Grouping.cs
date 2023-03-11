using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Grouping
    {
        public Grouping()
        {
            PrincipalGrouping = new HashSet<PrincipalGrouping>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime InsertDate { get; set; }
        public string InsertUser { get; set; } = null!;
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; } = null!;

        public virtual ICollection<PrincipalGrouping> PrincipalGrouping { get; set; }
    }
}
