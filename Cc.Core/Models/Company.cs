using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Company
    {
        public Company()
        {
            Agency = new HashSet<Agency>();
            Customer = new HashSet<Customer>();
            CustomerRequiredField = new HashSet<CustomerRequiredField>();
            Principal = new HashSet<Principal>();
            Product = new HashSet<Product>();
            Region = new HashSet<Region>();
        }

        public long Id { get; set; }
        public string BusinessName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string VatCode { get; set; } = null!;
        public DateTime InsertDate { get; set; }
        public string InsertUser { get; set; } = null!;
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; } = null!;
        public string? Mail { get; set; }
        public string? TaxCode { get; set; }

        public virtual Configuration? Configuration { get; set; }
        public virtual ICollection<Agency> Agency { get; set; }
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<CustomerRequiredField> CustomerRequiredField { get; set; }
        public virtual ICollection<Principal> Principal { get; set; }
        public virtual ICollection<Product> Product { get; set; }
        public virtual ICollection<Region> Region { get; set; }
    }
}
