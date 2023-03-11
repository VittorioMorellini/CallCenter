using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Cc.Core.Services;
using Cc.Core.Utils;
using Cc.Core.Models;
using System.IO;

namespace Cc.Api.Controllers
{
    [Authorize]
    [Route("document")]
    public class DocumentController : Controller
    {
        private IDocumentService service;
        public DocumentController(IDocumentService service)
        {
            this.service = service;
        }

        [HttpGet("{id}")]
        public IActionResult Find(long id)
        {
            return ServiceResult.Execute(() => service.Find(id));
        }

        [HttpPost("search")]
        //[EnhanceModelFilter]
        public IActionResult Search([FromBody] DocumentSearchModel model)
        {
            return ServiceResult.Execute(() => service.Search(model));
        }

        [HttpPost]
        public IActionResult Save([FromBody] Document item)
        {
            return ServiceResult.Execute(() => service.Save(item.Id, item));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] long id)
        {
            return ServiceResult.Execute(() => service.Delete(id));
        }

        [HttpGet("file/{id}")]
        public IActionResult GetFileStream(long id)
        {
            try
            {
                return new FileStreamResult(new MemoryStream(service.GetFile(id)), "application/octet-stream");
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpGet("file/signed/{id}")]
        public IActionResult GetFileSignedStream(long id)
        {
            try
            {
                return new FileStreamResult(new MemoryStream(service.GetFileSigned(id)), "application/octet-stream");
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
