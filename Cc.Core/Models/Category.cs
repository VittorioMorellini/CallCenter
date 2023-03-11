using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Category
    {
        public Category()
        {
            Investment = new HashSet<Investment>();
            PrincipalAuth = new HashSet<PrincipalAuth>();
            Product = new HashSet<Product>();
        }

        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public string? SubProduct { get; set; }

        public virtual ICollection<Investment> Investment { get; set; }
        public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
