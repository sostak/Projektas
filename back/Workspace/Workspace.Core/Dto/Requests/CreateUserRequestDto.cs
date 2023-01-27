namespace Workspace.Core.Dto.Requests
{
    public class CreateUserRequestDto
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
    }
}
