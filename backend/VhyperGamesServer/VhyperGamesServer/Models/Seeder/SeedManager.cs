﻿using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Seeders;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Models.Seeder;

public class SeedManager
{
    private readonly MyDbContext _context;
    private readonly IAService _iaService;

    public SeedManager(MyDbContext context, IAService iaService)
    {
        _context = context;
        _iaService = iaService;
    }

    public void SeedAll()
    {
        var gameRequirementsSeeder = new GameRequirementsSeeder(_context);
        gameRequirementsSeeder.Seed();

        var gameSeeder = new GameSeeder(_context);
        gameSeeder.Seed();

        var userSeeder = new UserSeeder(_context);
        userSeeder.Seed();
        
        var reviewSeeder = new ReviewSeeder(_context, _iaService);
        reviewSeeder.Seed();
    }
}