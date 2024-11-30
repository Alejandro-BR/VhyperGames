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
    private ReserveRepository _reserveRepository;
    private ReserveDetailsRepository _reserveDetailsRepository;
    private OrderRepository _orderRepository;
    private OrderDetailRepository _orderDetailsRepository;
    private ImageGameRepository _imageGameRepository;
    

    public UserRepository UserRepository => _userRepository ??= new UserRepository(_myDbContext);
    public GameRepository GameRepository => _gameRepository ??= new GameRepository(_myDbContext);
    public ReviewRepository ReviewRepository => _reviewRepository ??= new ReviewRepository(_myDbContext);
    public RequerimentRepository RequerimentRepository => _requerimentRepository ??= new RequerimentRepository(_myDbContext);
    public CartRepository CartRepository => _cartRepository ??= new CartRepository(_myDbContext);
    public CartDetailsRepository CartDetailsRepository => _cartDetailsRepository ??= new CartDetailsRepository(_myDbContext);
    public ReserveRepository ReserveRepository => _reserveRepository ??= new ReserveRepository(_myDbContext);
    public ReserveDetailsRepository ReserveDetailsRepository => _reserveDetailsRepository ??= new ReserveDetailsRepository(_myDbContext);
    public OrderRepository OrderRepository => _orderRepository ??= new OrderRepository(_myDbContext);
    public OrderDetailRepository OrderDetailsRepository => _orderDetailsRepository ??= new OrderDetailRepository(_myDbContext);
    public ImageGameRepository ImageGameRepository => _imageGameRepository ??= new ImageGameRepository(_myDbContext);

    public UnitOfWork(MyDbContext myDbContext)
    {
        _myDbContext = myDbContext;
    }

    public async Task<bool> SaveAsync()
    {
        return await _myDbContext.SaveChangesAsync() > 0;
    }
}
