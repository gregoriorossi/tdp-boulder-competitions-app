
namespace TDPCompetitions.Core.Exceptions;

public class RegistrationNotFoundException : Exception
{
    public RegistrationNotFoundException(Guid id)
        : base($"Registration with id {id} not found") { }
}
