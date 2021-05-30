using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using VideoHosting.Abstractions.Dto;
using VideoHosting.Abstractions.Services;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace VideoHosting.Core.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpPost]
        [Route("UploadVideo")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult> AddVideo([FromForm] VideoAddDto model)
        {
            model.UserId = User.Identity.Name;
            var files = HttpContext.Request.Form.Files;
            string path = Path.Combine(Directory.GetCurrentDirectory(), "UsersContent");

            for (int i = 0; i < 2; i++)
            {
                string save = Guid.NewGuid().ToString();
                if (files[i].FileName.Contains(".jpg") || files[i].FileName.Contains(".jpeg"))
                {
                    model.PhotoPath = save + ".jpg";
                    using (var stream = System.IO.File.Create(Path.Combine(path, "VideosPhotos", model.PhotoPath)))
                    {
                        await files[i].CopyToAsync(stream);
                    }
                }
                if (files[i].FileName.Contains(".png"))
                {
                    model.PhotoPath = save + ".png";
                    using (var stream = System.IO.File.Create(Path.Combine(path, "VideosPhotos", model.PhotoPath)))
                    {
                        await files[i].CopyToAsync(stream);
                    }
                }
                if (files[i].FileName.Contains(".mp4"))
                {
                    model.VideoPath = save + ".mp4";
                    using (var stream = System.IO.File.Create(Path.Combine(path, "UsersVideos", model.VideoPath)))
                    {
                        await files[i].CopyToAsync(stream);
                    }
                }
            }

            Guid videoId = await _videoService.AddVideo(model);

            return Ok(videoId);
        }

        [HttpDelete]
        [Route("DeleteVideo/{id}")]
        public async Task<ActionResult> DeleteVideo(Guid id)
        {
            VideoDto videoDto = await _videoService.GetVideoById(id, User.Identity.Name);
            if (videoDto.UserId == User.Identity.Name || User.IsInRole("Admin"))
            {
                await _videoService.RemoveVideo(id);

                string videoPath = Path.Combine(Directory.GetCurrentDirectory(), "UsersContent\\VideosPhotos", videoDto.PhotoPath.Split("/").Last());
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "UsersContent\\UsersVideos", videoDto.VideoPath.Split("/").Last());

                System.IO.File.Delete(videoPath);
                System.IO.File.Delete(imagePath);

                return Ok(new { message = "This video was deleted" });
            }

            throw new Exception("You do not have permission");
        }

        [HttpGet]
        [Route("GetVideoById/{id}")]
        public async Task<ActionResult> GetVideoById(Guid id)
        {
            VideoDto videoDto = await _videoService.GetVideoById(id, User.Identity.Name);
            await _videoService.AddView(id);
            return Ok(videoDto);
        }

        [HttpGet]
        [Route("UsersVideos/{id}")]
        public async Task<ActionResult> GetVideosOfUser(string id)
        {
            IEnumerable<VideoDto> videos = await _videoService.GetVideosOfUser(id);
            return Ok(videos);
        }

        [HttpGet]
        [Route("GetVideosSubscripters")]
        public async Task<ActionResult> GetVideosSubscripters()
        {
            IEnumerable<VideoDto> videos = await _videoService.GetVideosOfSubscripters(User.Identity.Name);
            return Ok(videos);
        }

        [HttpGet]
        [Route("LikedVideos/{id}")]
        public async Task<ActionResult> GetLikedVideos(string id)
        {
            IEnumerable<VideoDto> videos = await _videoService.GetLikedVideos(id);
            return Ok(videos);
        }

        [HttpGet]
        [Route("DislikedVideos/{id}")]
        public async Task<ActionResult> GetDislikedVideos(string id)
        {
            IEnumerable<VideoDto> videos = await _videoService.GetDisLikedVideos(id);
            return Ok(videos);
        }

        //[HttpGet]
        //[Route("allVideos")]
        //public async Task<ActionResult> GetVideo()
        //{
        //    IEnumerable<VideoDto> videos = await _videoService.GetVideos(User.Identity.Name);
        //    return Ok(videos);
        //}

        [HttpGet]
        [Route("GetVideosByName/{name}")]
        public async Task<ActionResult> GetVideosByName(string name)
        {
            IEnumerable<VideoDto> videos = await _videoService.GetVideosByName(name, User.Identity.Name);
            return Ok(videos);
        }
    }
}
