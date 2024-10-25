﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VhyperGamesServer.Database;

namespace VhyperGamesServer.Repositories;

public abstract class Repository<TEntity, TId> : IRepository<TEntity, TEntity> where TEntity : class
{
    protected MyDbContext Context { get; init; }

    public Repository(MyDbContext context)
    {
        Context = context;
    }

    public async Task<ICollection<TEntity>> GetAllAsync()
    {
        return await Context.Set<TEntity>().ToArrayAsync();
    }

    public IQueryable<TEntity> GetQueryable(bool asNoTracking = true)
    {
        DbSet<TEntity> entities = Context.Set<TEntity>();

        return asNoTracking ? entities.AsNoTracking() : entities;
    }

    public async Task<TEntity> InsertAsync(TEntity entity)
    {
        EntityEntry<TEntity> entry = await Context.Set<TEntity>().AddAsync(entity);

        return entry.Entity;
    }

    public async Task<TEntity> GetByIdAsync(object id)
    {
        return await Context.Set<TEntity>().FindAsync(id);
    }

    public async Task<bool> ExistsAsync(object id)
    {
        return await GetByIdAsync(id) != null;
    }


}

