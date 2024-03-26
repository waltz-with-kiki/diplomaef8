using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using try2.DAL.Interfaces;
using try2.DAL.Models;

namespace diploma.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExaminationTemplatesController : ControllerBase
    {

        private readonly IRepository<ExaminationTemplate> _RepExaminationTemplates;

        public ExaminationTemplatesController(IRepository<ExaminationTemplate> RepExaminationTemplates)
        {
            _RepExaminationTemplates = RepExaminationTemplates;
        }

        [HttpGet("templates")]
        public async Task<ICollection<ExaminationTemplate>> GetExaminationTemplates()
        {
            return await _RepExaminationTemplates.Items.ToListAsync();
        }

    }
}
