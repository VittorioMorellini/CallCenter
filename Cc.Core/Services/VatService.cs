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
    public interface IVatService : IBaseService<Vat, long, CcDbContext>
    {
        IEnumerable<Vat> Search(VatSearchModel model);
    }

    public class VatService : BaseService<Vat, long, CcDbContext>, IVatService
    {
        public VatService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Vat> Search(VatSearchModel model)
        {
            return ctx.Vat;
        }
    }

    public class VatSearchModel : QueryBuilderSearchModel
    {

    }
}
