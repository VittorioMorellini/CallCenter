using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Customer
    {
        public Customer()
        {
            CustomerCall = new HashSet<CustomerCall>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long CompanyId { get; set; }
        public long? AgencyId { get; set; }
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string City { get; set; } = null!;
        public string? Cap { get; set; }
        public string Address { get; set; } = null!;
        public int? AddressNumber { get; set; }
        public long? DistrictId { get; set; }
        public string? Country { get; set; }
        public string? Sex { get; set; }
        public string? Type { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string? Mail { get; set; }
        public string? TaxCode { get; set; }
        public string? VatCode { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? IdentificationDocType { get; set; }
        public string? IdentificationDocNumber { get; set; }
        public string? IdentificationDocCountry { get; set; }
        public DateTime? IdentificationDocReleaseDate { get; set; }
        public DateTime? IdentificationDocExpirationDate { get; set; }
        public DateTime? ContactDate { get; set; }
        public DateTime? RecallDate { get; set; }
        public string? Notes { get; set; }
        public long? SalesmanId { get; set; }
        public long? ProductId { get; set; }
        public DateTime? Disabled { get; set; }
        public long? BroadcastingId { get; set; }

        public virtual Agency? Agency { get; set; }
        public virtual Broadcasting? Broadcasting { get; set; }
        public virtual Company Company { get; set; } = null!;
        public virtual TabDistrict? District { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Principal? Salesman { get; set; }
        public virtual ICollection<CustomerCall> CustomerCall { get; set; }
    }
}
