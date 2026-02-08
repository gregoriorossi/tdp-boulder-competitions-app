using TDPCompetitions.Core.Enums;

namespace TDPCompetitions.Api.Helpers
{
    public class CompetitionsHelper
    {
        public static CompetitionStatus? IntToStatus(int status)
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
