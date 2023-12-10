from model.avaliador import Avaliador
from model.carregador import Carregador
from model.modelo import Model

#To run: pytest -v test_modelos.py

# Instanciação das Classes
carregador = Carregador()
modelo = Model()
avaliador = Avaliador()

# Parâmetros    
url_dados = "../data/dataset_water_potability_golden.csv"
colunas = ['ph',
            'hardness',
            'solids',
            'chloramines',
            'sulfate',
            'conductivity',
            'organic_carbon',
            'trihalomethanes',
            'turbidity',
            'potability']

# Carga dos dados
dataset = carregador.carregar_dados(url_dados, colunas)

# Substitui NaNs pela média das colunas especificadas
dataset['ph'].fillna(value=dataset['ph'].median(),inplace=True)
dataset['sulfate'].fillna(value=dataset['sulfate'].median(),inplace=True)
dataset['trihalomethanes'].fillna(value=dataset['trihalomethanes'].median(),inplace=True)

# Separando em dados de entrada e saída
array = dataset.values
X = array[:,0:9]
Y = array[:,9]
    
# Método para testar o modelo SVM a partir do arquivo correspondente
def test_modelo():
 
    # Importando o modelo de SVM
    path = 'ml_model/water_potability.pkl'
    modelo =  Model.carrega_modelo(path)

    # aplicação da padronização no conjunto de treino
    rescaledX = modelo.scaler.transform(X)

    # Obtendo as métricas da SVM
    acuracia, recall, precisao, f1 = avaliador.avaliar(modelo, rescaledX, Y)
       
    # Testando as métricas da SVM 
    # Métricas de acordo com os requisitos
    assert acuracia >= 0.7 
    assert recall >= 0.5 
    assert precisao >= 0.07
    assert f1 >= 0.1 

 

