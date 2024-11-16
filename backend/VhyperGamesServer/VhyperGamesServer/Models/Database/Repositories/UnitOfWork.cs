using VhyperGamesServer.Models.Database;
using VhyperGamesServer.Services;

namespace VhyperGamesServer.Models.Database.Repositories;


public class UnitOfWork
{
    private readonly MyDbContext _myDbContext;
    private UserRepository _userRepository;
    private GameRepository _gameRepository;
    private RequerimentRepository _requerimentRepository;
    private ReviewRepository _reviewRepository;
    private CartRepository _cartRepository;
    private CartDetailsRepository _cartDetailsRepository;
    

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_myDbContext);
    public GameRepository GameRepository => _gameRepository ??= new GameRepository(_myDbContext);
    public ReviewRepository ReviewRepository => _reviewRepository ??= new ReviewRepository(_myDbContext);
    public RequerimentRepository RequerimentRepository => _requerimentRepository ??= new RequerimentRepository(_myDbContext);
    public CartRepository CartRepository => _cartRepository ??= new CartRepository(_myDbContext);
    public CartDetailsRepository CartDetailsRepository => _cartDetailsRepository ??= new CartDetailsRepository(_myDbContext);
    

    public UnitOfWork(MyDbContext myDbContext)
    {
        _myDbContext = myDbContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _myDbContext.SaveChangesAsync() > 0;
    }
}
