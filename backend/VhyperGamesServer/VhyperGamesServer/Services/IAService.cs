using Microsoft.Extensions.ML;
using System.Globalization;
using System.Text;
using VhyperGamesServer.Models.IA;
using VhyperGamesServer.Utilities;

namespace VhyperGamesServer.Services;

public class IAService
{
    private readonly PredictionEnginePool<ModelInput, ModelOutput> _model;
 

    public IAService(PredictionEnginePool<ModelInput, ModelOutput> model)
    {
        _model = model;
      
    }

    public ModelOutput Predict(string text)
    {
        string textModificado = TextCleaner.Clear(text);

        ModelInput input = new ModelInput()
        {
            Text = textModificado
        };

        ModelOutput ouput = _model.Predict(input);

        ouput.Text = text;

        return ouput;
    }
}
