using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using VideoHosting.Abstractions.Dto;
using VideoHosting.Abstractions.Services;
using System;
using System.Linq;

namespace VideoHosting.Core.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public UserController(IUserService service, IMapper mapper)
        {
            _mapper = mapper;
            _userService = service;
        }

        [HttpPost]
        [Route("UpdateUserPhoto")]
        public async Task<ActionResult> UploadPhoto()
        {
            var files = HttpContext.Request.Form.Files;
            string path = Path.Combine(Directory.GetCurrentDirectory(), "UsersContent\\UsersPhotos");

            UserDto user = await _userService.GetUserById(User.Identity.Name, User.Identity.Name);
            string imagePath = string.IsNullOrWhiteSpace(user.PhotoPath) ? null : Path.Combine(path,user.PhotoPath.Split("/").Last());

            if (files[0].FileName.Contains(".jpg") || files[0].FileName.Contains(".png") || files[0].FileName.Contains(".jpeg"))
            {
                string storePath = files[0].FileName.Contains(".jpg") || files[0].FileName.Contains(".jpeg") ? Guid.NewGuid() + ".jpg" : Guid.NewGuid() + ".png";
                string fullPath = Path.Combine(path, storePath);

                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(fullPath);
                }

                using (var stream = System.IO.File.Create(fullPath))
                {
                    await files[0].CopyToAsync(stream);
                }

                user.PhotoPath = storePath;
                await _userService.UpdateProfile(user);
            }
            else
            {
                return BadRequest("Image should be .jpg or .png");
            }
            return Ok();
        }

        [HttpPut]
        [Route("Subscribe/{Id}")]
        public async Task<ActionResult> Subscribe(string id)
        {
            bool isSubscribed = await _userService.Subscribe(User.Identity.Name, id);
            return Ok(isSubscribed);
        }

        [HttpPut]
        [Route("UpdateUserInfo")]
        public async Task<ActionResult> UpdateUser(UserDto model)
        {
            model.PhotoPath = null;
            model.Id = User.Identity.Name;

            await _userService.UpdateProfile(model);
            return Ok(new { message = "You changed data" });
        }


        [HttpGet]
        [Route("ProfileUser/{Id}")]
        public async Task<ActionResult> GetUser(string id)
        {
            UserDto user = await _userService.GetUserById(id, User.Identity.Name);
            return Ok(user);
        }

        [HttpGet]
        [Route("subscribers")]
        public async Task<ActionResult> GetSubscribers()
        {
            IEnumerable<UserDto> users = await _userService.GetSubscribers(User.Identity.Name);
            return Ok(users);
        }

        [HttpGet]
        [Route("FindSubscriptions")]
        public async Task<ActionResult> GetSubscriptions()
        {
            IEnumerable<UserDto> users = await _userService.GetSubscriptions(User.Identity.Name);
            return Ok(users);
        }

        [HttpGet]
        [Route("FindUserByName/{name}")]
        public async Task<ActionResult> GetUserByName(string name)
        {
            IEnumerable<UserDto> users = await _userService.GetUserBySubName(name, User.Identity.Name);
            return Ok(users);
        }
    }
}
