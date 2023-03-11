using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Product
    {
        public Product()
        {
            BroadcastingProduct = new HashSet<BroadcastingProduct>();
            Customer = new HashSet<Customer>();
            CustomerRequiredField = new HashSet<CustomerRequiredField>();
            Investment = new HashSet<Investment>();
            OrderRow = new HashSet<OrderRow>();
            PrincipalAuth = new HashSet<PrincipalAuth>();
            WarehouseMovement = new HashSet<WarehouseMovement>();
        }

        public long Id { get; set; }
        public string Description { get; set; } = null!;
        public double Price { get; set; }
        public string Code { get; set; } = null!;
        public long CompanyId { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<BroadcastingProduct> BroadcastingProduct { get; set; }
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<CustomerRequiredField> CustomerRequiredField { get; set; }
        public virtual ICollection<Investment> Investment { get; set; }
        public virtual ICollection<OrderRow> OrderRow { get; set; }
        public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; }
        public virtual ICollection<WarehouseMovement> WarehouseMovement { get; set; }
    }
}
