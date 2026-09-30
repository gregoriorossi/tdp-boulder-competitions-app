namespace TDPCompetitions.Core.Exceptions
{
    public class ProblemNotFoundException : Exception
    {
        public ProblemNotFoundException(Guid id)
            : base($"Problem with id {id} not found") { }
    }
}
