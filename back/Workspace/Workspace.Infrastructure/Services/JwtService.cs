using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Workspace.Core.Dto;
using Workspace.Core.Interfaces;
using Workspace.Domain.Models;
using Workspace.Infrastructure.AppSettings;
using System.Security.Claims;

namespace Workspace.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSettings _jwtSettings;

        private const string HashAlgorithm = SecurityAlgorithms.HmacSha256Signature;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly SymmetricSecurityKey _securityKey;

        public JwtService(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
            _tokenHandler = new JwtSecurityTokenHandler();
            _securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret));
        }

        public JwtDto BuildJwt(User user)
        {
            var tokenDescriptor = CreateAccessTokenDescriptor(user);
            var securityToken = _tokenHandler.CreateToken(tokenDescriptor);

            return new JwtDto
            {
                AccessToken = _tokenHandler.WriteToken(securityToken),
            };
        }

        private SecurityTokenDescriptor CreateAccessTokenDescriptor(User user)
        {
            var claims = new List<Claim>
        {
            new(ClaimTypes.Sid, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //Couldn't find where lifetime is set, so for now it is what it is 
                Expires = DateTime.Now.Add(_jwtSettings.TokenLifetime).AddHours(5),
                SigningCredentials = new SigningCredentials(_securityKey, HashAlgorithm),
            };

            return tokenDescriptor;
        }
    }
}
