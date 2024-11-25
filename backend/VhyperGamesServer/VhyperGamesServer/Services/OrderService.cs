using VhyperGamesServer.Models.Database.Entities;
using VhyperGamesServer.Models.Database.Entities.Enuml;
using VhyperGamesServer.Models.Database.Repositories;
using VhyperGamesServer.Models.Dtos;
using VhyperGamesServer.Models.Mappers;

namespace VhyperGamesServer.Services
{
    public class OrderService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly EmailService _emailService;
        private readonly ReserveAndOrderMapper _mapper;

        public OrderService(UnitOfWork unitOfWork, ReserveAndOrderMapper mapper, EmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            Order order = await _unitOfWork.OrderRepository.GetOrderById(id);
            if (order == null)
            {
                throw new KeyNotFoundException($"No hay orders con este ID = {id}");
            }

            return order;
        }

        public async Task<List<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            List<Order> orders = await _unitOfWork.OrderRepository.GetOrdersByUserId(userId);

            if (orders == null || orders.Count == 0)
            {
                throw new KeyNotFoundException($"No hay orders con este ID de user = {userId}");
            }

            List<OrderDto> orderDtos = new List<OrderDto>();
            foreach (Order order in orders)
            {
                orderDtos.Add(_mapper.ToOrderDto(order));
            }

            return orderDtos;
        }

        public async Task<OrderDto> GetRecentOrderByUserIdAsync(int userId)
        {
            Order order = await _unitOfWork.OrderRepository.GetRecentOrderByUserId(userId);

            if (order == null)
            {
                throw new KeyNotFoundException($"No hay orders con este ID de user = {userId}");
            }

            return _mapper.ToOrderDto(order);
        }

        public async Task CreateOrderFromReserve(Reserve reserve, PayMode modeOfPay)
        {
            int totalPrice = reserve.ReserveDetails.Sum(detail => detail.Game.Price * detail.Quantity);

            Order order = new Order
            {
                UserId = reserve.UserId,
                TotalPrice = totalPrice,
                BillingDate = DateTime.UtcNow,
                ModeOfPay = modeOfPay,
                OrderDetails = reserve.ReserveDetails.Select(detail => new OrderDetail
                {
                    GameId = detail.GameId,
                    Quantity = detail.Quantity,
                }).ToList()
            };

            await _unitOfWork.OrderRepository.InsertAsync(order);
            await _unitOfWork.SaveAsync();

            await _emailService.NewEmail(order.UserId);
        }
    }
}
