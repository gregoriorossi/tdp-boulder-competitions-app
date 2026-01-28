namespace TDPCompetitions.Core.Errors
{
    public sealed class Error(string code, string description)
    {
        public static readonly Error Instance = new(string.Empty, string.Empty);
    }
}
