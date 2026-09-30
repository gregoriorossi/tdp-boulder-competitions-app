namespace TDPCompetitions.Core.Entities
{
    public class File : BaseEntity<Guid>
    {
        public string FileName { get; set; } = default!;

        public string ContentType { get; set; } = default!;

        public long Length { get; set; }

        public byte[] Data { get; set; } = default!;
    }
}
