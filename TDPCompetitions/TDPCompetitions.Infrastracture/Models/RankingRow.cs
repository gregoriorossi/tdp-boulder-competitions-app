namespace TDPCompetitions.Infrastracture.Models;

public sealed record class RankingRow
    (
        int Position,
        double Score,
        string FirstName,
        string LastName
    )
{
}
