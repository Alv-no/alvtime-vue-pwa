﻿using System;
using System.Collections.Generic;

namespace AlvTime.Persistence.DataBaseModels
{
    public partial class AccessTokens
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Value { get; set; }
        public string FriendlyName { get; set; }

        public virtual User User { get; set; }
    }
}
