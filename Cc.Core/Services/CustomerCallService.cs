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
    public interface ICustomerCallService : IBaseService<CustomerCall, long, CcDbContext>
    {
        IEnumerable<CustomerCall> Search(CustomerCallSearchModel model);
    }

    public class CustomerCallService : BaseService<CustomerCall, long, CcDbContext>, ICustomerCallService
    {
        public CustomerCallService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<CustomerCall> Search(CustomerCallSearchModel model)
        {
            var query = ctx.CustomerCall.AsQueryable();

            if (model != null && model.CustomerId != null)
                query = query.Where(x => x.CustomerId == model.CustomerId.GetValueOrDefault());

            return query.ToList();
        }
    }

    public class CustomerCallSearchModel : BaseSearchModel
    {
        public long? CustomerId { get; set; }
    }
}
