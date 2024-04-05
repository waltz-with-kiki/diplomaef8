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

        private readonly IRepository<HmiQuestionnaire> _RepHmiQuestionnaires;

        private readonly IRepository<ImQuestionnaire> _RepImQuestionnaires;

        public ExaminationTemplatesController(IRepository<ExaminationTemplate> RepExaminationTemplates, IRepository<ImQuestionnaire> RepImQuestionnaires, IRepository<HmiQuestionnaire> RepHmiQuestionnaires)
        {
            _RepExaminationTemplates = RepExaminationTemplates;
            _RepHmiQuestionnaires = RepHmiQuestionnaires;
            _RepImQuestionnaires = RepImQuestionnaires;
        }

        [HttpGet("templates")]
        public async Task<ICollection<ExaminationTemplate>> GetExaminationTemplates()
        {
            return await _RepExaminationTemplates.Items.ToListAsync();
        }

        public record NewTemplate
        {
            public string? Name { get; set; }

           // public string Descr { get; set; }

            public string NameIm { get; set; }

            public string NameHmi { get; set; }

        }

        // Подписать BadRequests
        [HttpPost("addnewtemplate")]
        public async Task<IActionResult> AddTemplate([FromBody] NewTemplate template)
        {
            var a = await _RepExaminationTemplates.Items.Where(x => x.Name == template.Name).FirstOrDefaultAsync();

            if (a != null)
            {
                return BadRequest();
            }

            ExaminationTemplate newtemplate = new ExaminationTemplate
            {
                Name = template.Name,
                //Descr = template.Descr
            };


            if(template.NameHmi != null)
            {
                var b = await _RepHmiQuestionnaires.Items.Where(x => x.Name == template.NameHmi).FirstOrDefaultAsync();
                if(b == null)
                {
                    return BadRequest();
                }
                else
                {
                    newtemplate.QrhmiNavigation = b;
                }
            }

            if (template.NameIm != null)
            {
                var c = await _RepImQuestionnaires.Items.Where(x => x.Name == template.NameIm).FirstOrDefaultAsync();
                if (c == null)
                {
                    return BadRequest();
                }
                else
                {
                    newtemplate.QrimNavigation = c;
                }
            }

            _RepExaminationTemplates.Add(newtemplate);

            return Ok();
        }

        public record RemTemplate
        {
            public string Name { get; set; }
        }

        [HttpPost("removenewtemplate")]
        public async Task<IActionResult> RemoveTemplate([FromBody] RemTemplate template)
        {
            var a = await _RepExaminationTemplates.Items.Where(x => x.Name == template.Name).FirstOrDefaultAsync();

            if (a == null)
            {
                return BadRequest();
            }

            _RepExaminationTemplates.Remove(a.Id);

            return Ok();
        }

    }
}
