using Workspace.Core.Dto;
using Workspace.Domain.Models;

namespace Workspace.Core.Interfaces
{
    public interface IJwtService
    {
        public JwtDto BuildJwt(User user);
    }
}
