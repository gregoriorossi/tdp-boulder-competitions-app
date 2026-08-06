namespace TDPCompetitions.Api
{
    public class Constants
    {
        public const string DefaultApiRoute = "api/[controller]";
        public const string DATE_TIME_FILE_EXPORT_FORMAT = "yyyy-MM-dd_HH-mm-ss";
        public static class Config
        {
            public const string UseMockDatabase = "UseMockDatabase";

            public static class JWT
            {
                public const string Key = "Jwt:Key";
                public const string Issuer = "Jwt:Issuer";
            }

            public static class EmailServiceSettings
            {
                public const string SectionName = "EmailServiceSettings";

                public const string SmtpServer = "EmailServiceSettings:SmtpServer";
                public const string SmtpPort = "EmailServiceSettings:SmtpPort";
                public const string SenderEmail = "EmailServiceSettings:SenderEmail";
                public const string SenderName = "EmailServiceSettings:SenderName";
                public const string Username = "EmailServiceSettings:Username";
                public const string Password = "EmailServiceSettings:Password";
                public const string EnableSsl = "EmailServiceSettings:EnableSsl";
            }
        }

        public static class Roles
        {
            public const string EDITOR = "EDITOR";
        }
    }
}
