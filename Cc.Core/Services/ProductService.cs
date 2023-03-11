using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cc.Core.Models;
using Cc.Core.Utils;

namespace Cc.Core.Services
{
    public interface IProductService : IBaseService<Product, long, CcDbContext>
    {
        IEnumerable<Product> Search(ProductSearchModel model);
    }

    public class ProductService : BaseService<Product, long, CcDbContext>, IProductService
    {
        private readonly IIdentityService identityService;
        public ProductService(IIdentityService identityService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.identityService = identityService;
            //this.queryService = queryService;
            //userId = identityService.GetName();
        }

        public override Product Find(long id)
        {
            var product = ctx.Product
                .Where(x => x.Id == id).FirstOrDefault();

            return product;
        }

        public IEnumerable<Product> Search(ProductSearchModel model)
        {
            var query = ctx.Product.AsQueryable();

            if (model.CompanyId.HasValue)
                query = query.Where(x => x.CompanyId == model.CompanyId.GetValueOrDefault());
            //TODO, da fare successivamente
            //if (model.AgencyId.HasValue)
            //    query = query.Where(x => x.AgencyId == model.AgencyId.GetValueOrDefault());
            //if (model.AgencyIds != null && model.AgencyIds.Count() > 0)
            //    query = query.Where(x => model.AgencyIds.Contains(x.AgencyId.GetValueOrDefault()));
            if (!string.IsNullOrWhiteSpace(model.Code))
                query = query.Where(x => x.Code.StartsWith(model.Code));
            if (!string.IsNullOrWhiteSpace(model.Description))
                query = query.Where(x => x.Description.StartsWith(model.Description));
            if (model.ProductIds != null && model.ProductIds.Count() > 0)
                query = query.Where(x => model.ProductIds.Contains(x.Id));

            return query.ToList();
        }
    }

    public class ProductSearchModel : BaseSearchModel
    {
        public long? FlowId { get; set; }
        public long? CertificateId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool? Disabled { get; set; }
    }
}
