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
    public interface ICategoryService : IBaseService<Category, long, CcDbContext>
    {
        IEnumerable<Category> Search(CategorySearchModel model);
    }

    public class CategoryService : BaseService<Category, long, CcDbContext>, ICategoryService
    {
        public CategoryService(CcDbContext ctx = null)
            : base(ctx)
        {
        }

        public IEnumerable<Category> Search(CategorySearchModel model)
        {
            return ctx.Category;
        }
    }

    public class CategorySearchModel : QueryBuilderSearchModel
    {

    }
}
