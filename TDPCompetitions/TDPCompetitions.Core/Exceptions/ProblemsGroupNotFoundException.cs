namespace TDPCompetitions.Core.Exceptions
{
    public class ProblemsGroupNotFoundException : Exception
    {
        public ProblemsGroupNotFoundException(Guid id)
            : base($"ProblemsGroup with id {id} not found") { }
    }
}
