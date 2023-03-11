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
    public interface IDocumentService : IBaseService<Document, long, CcDbContext>
    {
        IEnumerable<Document> Search(DocumentSearchModel model);
        Document SetFile(long documentId, byte[] file);
        Document SetFileSigned(long documentId, byte[] fileSigned);
        byte[] GetFile(long documentId);
        byte[] GetFileSigned(long documentId);
    }

    public class DocumentService : BaseService<Document, long, CcDbContext>, IDocumentService
    {
        private readonly ILogQueryService queryService;
        public DocumentService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public byte[] GetFile(long documentId)
        {
            return Find(documentId).File;
        }

        public byte[] GetFileSigned(long documentId)
        {
            return Find(documentId).FileSigned;
        }

        public IEnumerable<Document> Search(DocumentSearchModel model)
        {
            var query = ctx.Document.AsQueryable();

            return queryService.Execute("Document", model, query);
        }

        public Document SetFile(long documentId, byte[] file)
        {
            var item = Find(documentId);
            if (item == null)
                throw new Exception($"Document not found, id: {documentId}");

            item.File = file;
            Save(item.Id, item);
            return item;
        }

        public Document SetFileSigned(long documentId, byte[] fileSigned)
        {
            var item = Find(documentId);
            if (item == null)
                throw new Exception($"Document not found, id: {documentId}");

            item.FileSigned = fileSigned;
            Save(item.Id, item);
            return item;
        }

        public override Document Save(long id, Document item)
        {
            if (!string.IsNullOrEmpty(item.FileEncoded))
                item.File = Convert.FromBase64String(item.FileEncoded);

            return base.Save(id, item);
        }
    }

    public class DocumentSearchModel : QueryBuilderSearchModel
    {
        public long? DocumentId { get; set; }
    }
}
