namespace TDPCompetitions.Core.Exceptions
{
    public class CompetitorNotFoundException : Exception
    {
        public CompetitorNotFoundException(Guid id)
            : base($"Competitor with id {id} not found") { }
    }
}
