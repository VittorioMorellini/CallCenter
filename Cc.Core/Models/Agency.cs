using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Agency
    {
        public Agency()
        {
            Customer = new HashSet<Customer>();
            CustomerRequiredField = new HashSet<CustomerRequiredField>();
            PrincipalAuth = new HashSet<PrincipalAuth>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long CompanyId { get; set; }
        public long? RegionId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? ProvinceCode { get; set; }
        public string? CityCode { get; set; }
        public string? Address { get; set; }
        public string? Cap { get; set; }
        public string? Mail { get; set; }
        public string? VatCode { get; set; }

        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<CustomerRequiredField> CustomerRequiredField { get; set; }
        public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; }
    }
}
