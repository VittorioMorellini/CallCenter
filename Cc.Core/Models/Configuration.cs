using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Configuration
    {
        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long? CompanyId { get; set; }
        public string? UiLogoUrl { get; set; }
        public string? UiLogoBackground { get; set; }
        public string? UiLanguage { get; set; }
        public string? UiHome { get; set; }
        public string? UiColorPrimaryLight { get; set; }
        public string? UiColorPrimaryMain { get; set; }
        public string? UiColorPrimaryDark { get; set; }
        public string? UiColorPrimaryContrastText { get; set; }
        public string? UiColorSecondaryLight { get; set; }
        public string? UiColorSecondaryMain { get; set; }
        public string? UiColorSecondaryDark { get; set; }
        public string? UiColorSecondaryContrastText { get; set; }
        public string? UiColorInfoLight { get; set; }
        public string? UiColorInfoMain { get; set; }
        public string? UiColorInfoDark { get; set; }
        public string? UiColorInfoContrastText { get; set; }
        public string? UiColorSuccessLight { get; set; }
        public string? UiColorSuccessMain { get; set; }
        public string? UiColorSuccessDark { get; set; }
        public string? UiColorSuccessContrastText { get; set; }
        public string? UiColorWarningLight { get; set; }
        public string? UiColorWarningMain { get; set; }
        public string? UiColorWarningDark { get; set; }
        public string? UiColorWarningContrastText { get; set; }
        public string? UiColorErrorLight { get; set; }
        public string? UiColorErrorMain { get; set; }
        public string? UiColorErrorDark { get; set; }
        public string? UiColorErrorContrastText { get; set; }
        public string? UiColorTextPrimary { get; set; }
        public string? UiColorTextSecondary { get; set; }
        public string? UiColorTextDisabled { get; set; }
        public string? UiColorTextHint { get; set; }
        public string? LegalBusUrl { get; set; }
        public string? LegalBusUsername { get; set; }
        public string? LegalBusPassword { get; set; }
        public string? LegalBusCompany { get; set; }
        public string? LegalBusStagingUrl { get; set; }
        public string? LegalBusStagingUsername { get; set; }
        public string? LegalBusStagingPassword { get; set; }
        public string? LegalBusStagingCompany { get; set; }
        public string? TopUrl { get; set; }
        public string? TopUsername { get; set; }
        public string? TopPassword { get; set; }
        public string? TopCompany { get; set; }
        public string? TopStagingUrl { get; set; }
        public string? TopStagingUsername { get; set; }
        public string? TopStagingPassword { get; set; }
        public string? TopStagingCompany { get; set; }
        public int? RetentionPolicy { get; set; }
        public int? RetentionPeriod { get; set; }
        public int? RetentionPeriodArchive { get; set; }
        public int? PrincipalMaxCount { get; set; }
        public string? PersonDefaultCountry { get; set; }
        public string? PersonDefaultPhonePrefix { get; set; }
        public string? LegalArchivingMode { get; set; }
        public string? FtpServer { get; set; }
        public string? FtpPort { get; set; }
        public string? FtpUsername { get; set; }
        public string? FtpPassword { get; set; }
        public string? FtpOutputDir { get; set; }
        public string? FtpInputDir { get; set; }
        public string? FtpDoneDir { get; set; }
        public string? FtpWorkingDir { get; set; }
        public string? UiCustomerDetail { get; set; }

        public virtual Company? Company { get; set; }
    }
}
