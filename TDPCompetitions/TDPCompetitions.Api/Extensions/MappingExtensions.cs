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
                    return Gender.ALL;
            }
        }

        public static bool TryParseGender(this string? input, out Gender? gender)
        {
            gender = null;

            if (string.IsNullOrEmpty(input) || input.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                gender = Gender.ALL;
                return true;
            }

            if (input.Equals("male", StringComparison.OrdinalIgnoreCase))
            {
                gender = Gender.MALE;
                return true;
            } else if (input.Equals("female", StringComparison.OrdinalIgnoreCase))
            {
                gender = Gender.FEMALE;
                return true;
            }

            return false;
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
