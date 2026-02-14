namespace TDPCompetitions.Core.Exceptions
{
    public class CompetitionNotFoundException : Exception
    {
        public CompetitionNotFoundException(Guid id)
            : base($"Competition with id {id} not found") { }
    }
}
