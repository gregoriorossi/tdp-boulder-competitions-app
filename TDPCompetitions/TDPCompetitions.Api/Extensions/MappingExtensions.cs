using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.Extensions
{
    public static class MappingExtensions
    {
        public static Gender IntToGender(this int gender)
        {
            switch (gender)
            {
                case 0:
                    return Gender.MALE;
                case 1:
                    return Gender.FEMALE;
                default:
                    return Gender.UNKNOWN;
            }
        }

        public static CompetitionStatus? IntToStatus(this int status)
        {
            switch (status)
            {
                case 0:
                    return CompetitionStatus.DRAFT;
                case 1:
                    return CompetitionStatus.OPEN;
                case 2:
                    return CompetitionStatus.CLOSED;
                default:
                    return null;
            }
        }
    }
}
