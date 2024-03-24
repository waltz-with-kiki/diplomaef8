﻿using System;
using System.Collections.Generic;
using try2.Domain.Entities.Base;

namespace try2.DAL.Models;

public partial class ImSectionGeneralAnswer : Entity
{
    public long? SectionId { get; set; }

    public long? QuestionnaireId { get; set; }

    public long? ExaminationId { get; set; }

    public double? Numeric { get; set; }

    public string? Comment { get; set; }

    public virtual Examination? Examination { get; set; }

    public virtual ImQuestionnaire? Questionnaire { get; set; }

    public virtual ImSection? Section { get; set; }
}
