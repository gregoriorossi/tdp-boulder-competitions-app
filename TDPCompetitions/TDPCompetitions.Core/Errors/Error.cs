namespace TDPCompetitions.Core.Errors
{
    public sealed record Error(string code, string description)
    {
        public static readonly Error None = new(string.Empty, string.Empty);
    }
}
