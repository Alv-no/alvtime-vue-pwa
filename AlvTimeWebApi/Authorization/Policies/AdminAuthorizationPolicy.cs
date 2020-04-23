﻿using Microsoft.AspNetCore.Authorization;
using System;

namespace AlvTimeWebApi.Authentication
{
    public class AdminAuthorizationPolicy
    {
        public static string Name => "Admin";

        public static void Build(AuthorizationPolicyBuilder builder) =>
            builder.RequireClaim("groups", "e05a0130-d8da-4b90-b11f-d1ff3118c97a");
    }
}