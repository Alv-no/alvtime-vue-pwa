﻿using AlvTime.Business.Tasks;
using AlvTime.Business.Tasks.Admin;
using AlvTimeWebApi.Authentication;
using AlvTimeWebApi.Controllers.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AlvTimeWebApi.Controllers.Admin
{
    [Route("api/admin")]
    [ApiController]
    public class TaskAdminController : Controller
    {
        private readonly TaskCreator _creator;
        private RetrieveUsers _userRetriever;

        public TaskAdminController(RetrieveUsers userRetriever, TaskCreator creator)
        {
            _userRetriever = userRetriever;
            _creator = creator;
        }

        [HttpPost("TaskAdmin")]
        [AuthorizeAdmin]
        public ActionResult<IEnumerable<TaskResponseDto>> CreateNewTask([FromBody] IEnumerable<CreateTaskDto> tasksToBeCreated)
        {
            List<TaskResponseDto> response = new List<TaskResponseDto>();

            var user = _userRetriever.RetrieveUser();

            foreach (var task in tasksToBeCreated)
            {
                response.Add(_creator.CreateTask(task, user.Id));
            }
            return Ok(response);
        }

        [HttpPut("TaskAdmin")]
        [AuthorizeAdmin]
        public ActionResult<IEnumerable<TaskResponseDto>> UpdateTask([FromBody] IEnumerable<UpdateTasksDto> tasksToBeUpdated)
        {
            var user = _userRetriever.RetrieveUser();

            List<TaskResponseDto> response = new List<TaskResponseDto>();

            foreach (var task in tasksToBeUpdated)
            {
                response.Add(_creator.UpdateTask(task, user.Id));
            }
            return Ok(response);
        }
    }
}