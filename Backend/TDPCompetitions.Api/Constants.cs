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

                public const string ApiToken = "EmailServiceSettings:ApiToken";
                public const string SenderEmail = "EmailServiceSettings:SenderEmail";
            }
        }

        public static class Roles
        {
            public const string COMPETITOR = "COMPETITOR";
            public const string EDITOR = "EDITOR";
        }
    }
}
