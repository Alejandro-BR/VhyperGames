using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VhyperGamesServer.Entities;

namespace VhyperGamesServer.Repositories;

public abstract class Repository<TEntity, TId> : IRepository<TEntity, TEntity> where TEntity : class
{
    protected MyDbMasterContext Context { get; init; }

    public Repository(MyDbMasterContext context)
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
        //await Context.SaveChangesAsync();

        return entry.Entity;
    }

    /*public async Task<bool> SaveAsync()
    {
        return await Context.SaveChangesAsync() > 0;
    }*/
}

