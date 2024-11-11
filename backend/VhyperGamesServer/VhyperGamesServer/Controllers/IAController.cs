using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using VhyperGamesServer.Models.IA;

[Route("api/[controller]")]
[ApiController]
public class IAController : ControllerBase
{
    private readonly PredictionEnginePool<ModelInput, ModelOutput> _model;

    public IAController(PredictionEnginePool<ModelInput, ModelOutput> model)
    {
        _model = model;
    }

    [HttpGet]
    public ModelOutput Predict(string text)
    {
        ModelInput input = new ModelInput()
        {
            Text = text
        };

        ModelOutput ouput = _model.Predict(input);

        return ouput;
    }
}
