using Microsoft.Extensions.ML;
using VhyperGamesServer.Models.IA;

namespace VhyperGamesServer.Services;

public class IAService
{
    private readonly PredictionEnginePool<ModelInput, ModelOutput> _model;
    private readonly SmartSearchService _smartSearchService;

    public IAService(PredictionEnginePool<ModelInput, ModelOutput> model , SmartSearchService smartSearchService)
    {
        _model = model;
        _smartSearchService = smartSearchService;
    }

    public ModelOutput Predict(string text)
    {
        string textModificado = _smartSearchService.ClearText(text);

        ModelInput input = new ModelInput()
        {
            Text = textModificado
        };

        ModelOutput ouput = _model.Predict(input);

        ouput.Text = text;

        return ouput;
    }

}
