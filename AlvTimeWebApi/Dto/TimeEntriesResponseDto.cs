﻿using System;

namespace AlvTimeWebApi.Dto
{
    public class TimeEntriesResponseDto
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public decimal Value { get; set; }
        public int TaskId { get; set; }
    }
}
