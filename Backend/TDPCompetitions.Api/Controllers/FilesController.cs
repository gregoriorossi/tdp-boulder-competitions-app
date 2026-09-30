using Microsoft.AspNetCore.Mvc;
using TDPCompetitions.Core.Interfaces.Managers;

namespace TDPCompetitions.Api.Controllers
{
    [ApiController]
    [Route(Constants.DefaultApiRoute)]
    public class FilesController : ControllerBase
    {
        private readonly IFilesManager _filesManager;

        public FilesController(IFilesManager filesManager)
        {
            _filesManager = filesManager;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var file = await _filesManager.GetByIdAsync(id, cancellationToken);
            if (file == null)
            {
                return NotFound();
            }
            else
            {
                return File(file.Data, file.ContentType);
            }
        }
    }
}
