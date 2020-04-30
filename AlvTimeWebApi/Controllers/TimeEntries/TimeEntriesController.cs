using AlvTime.Business.TimeEntries;
using AlvTimeWebApi.Authorization;
using AlvTimeWebApi.HelperClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AlvTimeWebApi.Controllers.TimeEntries
{
    [Route("api/user")]
    [ApiController]
    public class TimeEntriesController : Controller
    {
        private readonly ITimeEntryStorage _storage;
        private readonly TimeEntryCreator _creator;
        private RetrieveUsers _userRetriever;

        public TimeEntriesController(RetrieveUsers userRetriever, ITimeEntryStorage storage, TimeEntryCreator creator)
        {
            _userRetriever = userRetriever;
            _storage = storage;
            _creator = creator;
        }

        [HttpGet("TimeEntries")]
        [Authorize(Policy = "AllowPersonalAccessToken")]
        public ActionResult<IEnumerable<TimeEntriesResponseDto>> FetchTimeEntries(DateTime fromDateInclusive, DateTime toDateInclusive)
        {
            try
            {
                var user = _userRetriever.RetrieveUser();

                var hours = _storage.GetTimeEntries(new TimeEntryQuerySearch 
                {
                    UserId = user.Id,
                    FromDateInclusive = fromDateInclusive,
                    ToDateInclusive = toDateInclusive
                });

                return Ok(hours);
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    Message = e.ToString(),
                });
            }
        }

        [HttpPost("TimeEntries")]
        public ActionResult<List<TimeEntriesResponseDto>> UpsertTimeEntry([FromBody] List<CreateTimeEntryDto> requests)
        {
            var user = _userRetriever.RetrieveUser();

            return Ok(_creator.UpsertTimeEntry(requests, user.Id));
        }

        [HttpGet("TimeEntriesReport")]
        [Authorize(Policy = "AllowPersonalAccessToken")]
        public ActionResult<IEnumerable<SomeDto>> FetchTimeEntriesReport(DateTime fromDateInclusive, DateTime toDateInclusive)
        {
            var report = _storage.GetTimeEntriesForAllUsersInTimePeriod(new TimeEntryQuerySearch
            {
            });
        }
    }
}
