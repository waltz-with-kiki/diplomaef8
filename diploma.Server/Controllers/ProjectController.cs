using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using try2.DAL.Interfaces;
using try2.DAL.Models;
using try2.Domain.Entities;
using Version = try2.DAL.Models.Version;

namespace try2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProjectController : ControllerBase
    {
        private readonly IRepository<Version> _RepVersions;

        private readonly IRepository<Project> _RepProjects;

        private readonly IRepository<Expert> _RepExperts;

        private readonly IRepository<AircraftType> _RepAircraftTypes;

        public ProjectController(IRepository<Project> Projects
            , IRepository<Version> Versions, 
            IRepository<Expert> Experts,
            IRepository<AircraftType> AircraftTypes)
        {
            _RepProjects = Projects;
            _RepVersions = Versions;
            _RepExperts = Experts;
            _RepAircraftTypes = AircraftTypes;
        }

        [HttpGet("projects")]
        public async Task<ICollection<Project>> Get()
        {
            return await _RepProjects.Items.ToListAsync();
        }

        

        public record TransferProject
        {
            public string Name { get; set; }
        }

        public record TransferProjectId : TransferProject
        {
            public long Id { get; set; }
        }

        [HttpPost("addproject")]

        public IActionResult AddProject([FromBody] TransferProject project)
        {
            if (project == null || project.Name == null || project.Name.Length <= 3 || project.Name.Length >= 32)
            {
                return NoContent();
            }

            Project existingProject = _RepProjects.Items.FirstOrDefault(x => x.Name == project.Name);
            if (existingProject != null)
            {
                return BadRequest(new { ErrorMessage = "Проект с указанным именем уже существует." });
            }

            Project newProject = new Project { Name = project.Name };
            _RepProjects.Add(newProject);

            return Ok();
        }


        [HttpPost("removeproject")]

        public IActionResult RemoveProject([FromBody] TransferProject project)
        {
            if (project.Name != null)
            {
                Project check = _RepProjects.Items.Where(x => x.Name == project.Name).FirstOrDefault();

                if (check != null)
                {
                    _RepProjects.Remove(check.Id);
                }
                // Возвращаем успешный статус
                return Ok();
            }

            return NoContent();
        }


        [HttpPost("editproject")]
        public IActionResult ChangeProject([FromBody] TransferProjectId project)
        {
            if (project != null && project.Id != 0 && project.Name != null && project.Name.Length >= 3 && project.Name.Length < 32)
            {
                Project check = _RepProjects.Items.Where(x => x.Id == project.Id).FirstOrDefault();

                if (check != null)
                {
                    check.Name = project.Name;
                    _RepProjects.Update(check);
                }
                else return NotFound(new { ErrorMessage = "Проект не получается найти в базе данных" });
                // Возвращаем успешный статус
                return Ok();
            }

            return NoContent();
        }


        public record TransferVersion
        {
            public long ProjectId { get; set; }

            public int? N { get; set; }

            public int? Nn { get; set; }

            public int? Nnn { get; set; }

            public string? Descr { get; set; }

        }


        [HttpPost("addversion")]

        public IActionResult AddVersion([FromBody] TransferVersion version)
        {
            if (version?.ProjectId == null || version.N == null || version.Nn == null || version.Nnn == null)
            {
                return NoContent();
            }

            Project project = _RepProjects.Items.FirstOrDefault(x => x.Id == version.ProjectId);
            if (project == null)
            {
                return BadRequest(new { ErrorMessage = "Проекта не существует в базе данных" });
            }

            Version existingVersion = project.Versions.FirstOrDefault(x => x.N == version.N && x.Nn == version.Nn && x.Nnn == version.Nnn);
            if (existingVersion != null)
            {
                return BadRequest(new { ErrorMessage = "Такая версия в данном проекте уже имеется" });
            }

            Version newVersion = new Version
            {
                ProjectId = version.ProjectId,
                N = version.N,
                Nn = version.Nn,
                Nnn = version.Nnn,
                Descr = version.Descr
            };
            _RepVersions.Add(newVersion);

            return Ok();
        }

        [HttpPost("removeversion")]

        public IActionResult RemoveVersion([FromBody] TransferVersion version)
        {
            if (version?.ProjectId == null || version.ProjectId == 0)
            {
                return NoContent();
            }

            Project project = _RepProjects.Items.FirstOrDefault(x => x.Id == version.ProjectId);
            if (project == null)
            {
                return BadRequest(new { ErrorMessage = "Проекта с указанным идентификатором не существует в базе данных" });
            }

            Version versionToRemove = project.Versions.FirstOrDefault(x => x.N == version.N && x.Nn == version.Nn && x.Nnn == version.Nnn);
            if (versionToRemove == null)
            {
                return BadRequest(new { ErrorMessage = "Версии в данном проекте с указанными номерами не существует" });
            }

            _RepVersions.Remove(versionToRemove.Id);

            return Ok();
        }


        public record TransferVersionId : TransferVersion
        {
            public long Id { get; set; }

        }

        [HttpPost("changeversion")]

        public IActionResult ChangeVersion([FromBody] TransferVersionId version)
        {
            if (version?.ProjectId == null || version.ProjectId == 0 || version.N == null || version.Nn == null || version.Nnn == null)
            {
                return NoContent();
            }

            Project project = _RepProjects.Items.FirstOrDefault(x => x.Id == version.ProjectId);
            if (project == null)
            {
                return NotFound(new { ErrorMessage = "Проект с указанным идентификатором не найден" });
            }

            Version existingVersion = project.Versions.FirstOrDefault(x => x.N == version.N && x.Nn == version.Nn && x.Nnn == version.Nnn);
            if (existingVersion != null)
            {
                return BadRequest(new { ErrorMessage = "Такая версия уже существует в данном проекте" });
            }

            Version versionToUpdate = project.Versions.FirstOrDefault(x => x.Id == version.Id);
            if (versionToUpdate != null)
            {
                versionToUpdate.N = version.N;
                versionToUpdate.Nn = version.Nn;
                versionToUpdate.Nnn = version.Nnn;
                versionToUpdate.Descr = version.Descr;

                _RepVersions.Update(versionToUpdate);
            }
            else
            {
                return NotFound(new { ErrorMessage = "Версия с указанным Id не найдена в проекте" });
            }

            return Ok();
        }


        [HttpGet("experts")]
        public async Task<ICollection<Expert>> GetExperts()
        {
            return await _RepExperts.Items.ToListAsync();
        }

        [HttpGet("aircrafttypes")]
        public async Task<ICollection<AircraftType>> GetAircraftTypes()
        {
            return await _RepAircraftTypes.Items.ToListAsync();
        }

        public record NewExpert
        {
            public string? Surname { get; set; }

            public string? Name { get; set; }

            public string? Patronymic { get; set; }

            public int? BirthYear { get; set; }

            public int? ServiceYear { get; set; }

            public int? FlightHours { get; set; }

            public long? Education { get; set; }

            public int? PilotClass { get; set; }

            public string[] AircraftTypes { get; set; }

        }

        public record ChangeExpertId : NewExpert
        {
            public long Id { get; set; }
        }

        [HttpPost("addexpert")]
        public IActionResult AddExpert([FromBody] NewExpert newexpert)
        {
            if (newexpert == null || newexpert.Name == null || newexpert.Surname == null || newexpert.Patronymic == null)
            {
                return NoContent();
            }

            var checkexp = _RepExperts.Items.Where(x => x.Name == newexpert.Name && x.Surname == newexpert.Surname && x.Patronymic == newexpert.Patronymic && x.BirthYear == newexpert.BirthYear).FirstOrDefault();
            if(checkexp != null)
            {
                return BadRequest(new { ErrorMessage = "Такой эксперт уже есть в базе" });
            }

            //Console.WriteLine("Всё окей!");

            Expert createnewexpert = new Expert
            {
                Surname = newexpert.Surname,
                Name = newexpert.Name,
                Patronymic = newexpert.Patronymic,
                BirthYear = newexpert.BirthYear,
                ServiceYear = newexpert.ServiceYear,
                FlightHours = newexpert.FlightHours,
                Education = newexpert.Education,
                PilotClass = newexpert.PilotClass,
            };

            createnewexpert.AircraftTypes = new List<AircraftType>();

            foreach (var aircraftType in newexpert.AircraftTypes)
            {
                var thisaircrafttype = _RepAircraftTypes.Items.Where(x => x.Name == aircraftType).FirstOrDefault();
                createnewexpert.AircraftTypes.Add(thisaircrafttype);
            }

            _RepExperts.Add(createnewexpert);

            return Ok();
        }

        public record ExpertId
        {
            public long Id { get; set; }
        }

        [HttpPost("removeexpert")]

        public IActionResult RemoveExpert([FromBody] ExpertId expert)
        {
            if (expert == null)
            {
                return BadRequest(new { ErrorMessage = "Эксперт не найден" });
            }

            _RepExperts.Remove(expert.Id);

            return Ok();
        }


        [HttpPost("changeexpert")]
        public IActionResult ChangeExpert([FromBody] ChangeExpertId newexpert)
        {
            if (newexpert == null || newexpert.Name == null || newexpert.Surname == null || newexpert.Patronymic == null)
            {
                return BadRequest(new { ErrorMessage = "Некорретные данные" });
            }

            var checkexp = _RepExperts.Items.Where(x => x.Id == newexpert.Id).FirstOrDefault();
            if(checkexp == null)
            {
                return BadRequest(new { ErrorMessage = "Эксперта не удалось найти" });
            }

            //Console.WriteLine("Всё окей!");

            checkexp.Surname = newexpert.Surname;
            checkexp.Name = newexpert.Name;
            checkexp.Patronymic = newexpert.Patronymic;
            checkexp.BirthYear = newexpert.BirthYear;
            checkexp.ServiceYear = newexpert.ServiceYear;
            checkexp.FlightHours = newexpert.FlightHours;
            checkexp.Education = newexpert.Education;
            checkexp.PilotClass = newexpert.PilotClass;

            foreach (var oldAircraftType in checkexp.AircraftTypes.ToList())
            {
                if (!newexpert.AircraftTypes.Contains(oldAircraftType.Name))
                {
                    checkexp.AircraftTypes.Remove(oldAircraftType);
                }
            }

            foreach (var aircraftType in newexpert.AircraftTypes)
            {
                if (!checkexp.AircraftTypes.Any(x => x.Name == aircraftType))
                {
                    var thisaircrafttype = _RepAircraftTypes.Items.FirstOrDefault(x => x.Name == aircraftType);
                    if (thisaircrafttype != null)
                    {
                        checkexp.AircraftTypes.Add(thisaircrafttype);
                    }
                    else
                    {
                        return BadRequest(new { ErrorMessage = "Не найден тип ЛА" });
                    }
                }
            }

            _RepExperts.Update(checkexp);

            return Ok();
        }


    }
}
