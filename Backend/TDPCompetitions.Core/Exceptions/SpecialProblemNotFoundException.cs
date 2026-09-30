namespace TDPCompetitions.Core.Exceptions
{
    public class SpecialProblemNotFoundException : Exception
    {
        public SpecialProblemNotFoundException(Guid id)
        : base($"Problem with id {id} not found") { }
    }
}
