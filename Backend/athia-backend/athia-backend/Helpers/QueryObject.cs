namespace athia_backend.Helpers
{
    public class QueryObject
    {
        public string? company { get; set; } = null;
        public string? sector { get; set; } = null;
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 25;
    }
}
