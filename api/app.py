from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from sqlalchemy.exc import IntegrityError

from model import Session, Agua, Model
from logger import logger
from schemas import *
from flask_cors import CORS


# Instanciando o objeto OpenAPI
info = Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# Definindo tags para agrupamento das rotas
home_tag = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
agua_tag = Tag(name="Água", description="Adição, visualização, remoção e predição de águas potáveis")


# Rota home
@app.get('/', tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')


# Rota de listagem de aguas
@app.get('/aguas', tags=[agua_tag],
         responses={"200": AguaViewSchema, "404": ErrorSchema})
def get_aguas():
    """Lista todas as águas cadastradas na base
    Retorna uma lista de águas cadastradas na base.
    
    Args:
        name (str): Nome da água
        ph (float): pH
        hardness (float): Dureza
        solids (float): Sólidos
        chloramines (float): Cloraminas
        sulfate (float): Sulfato
        conductivity (float): Condutividade
        organic_carbon (float): Carbono Orgânico
        trihalomethanes (float): Trihalometanos
        turbidity (float): Turbidez
        potability (int): Potabilidade
        
    Returns:
        list: lista de águas cadastradas na base
    """
    session = Session()
    
    # Buscando todos os aguas
    aguas = session.query(Agua).all()
    
    if not aguas:
        logger.warning("Não há águas cadastradas na base :/")
        return {"message": "Não existe águas cadastradas na base!"}, 404
    else:
        logger.debug(f"%d águas encontradas" % len(aguas))
        return apresenta_aguas(aguas), 200


# Rota de adição de agua
@app.post('/agua', tags=[agua_tag],
          responses={"200": AguaViewSchema, "400": ErrorSchema, "409": ErrorSchema})
def predict(form: AguaSchema):
    """Adiciona uma nova água à base de dados
    Retorna uma representação das águas e suas potabilidades
    
    Args:
        name (str): nome do água
        ph (float): pH
        hardness (float): Dureza
        solids (float): Sólidos
        chloramines (float): Cloraminas
        sulfate (float): Sulfato
        conductivity (float): Condutividade
        organic_carbon (float): Carbono Orgânico
        trihalomethanes (float): Trihalometanos
        turbidity (float): Turbidez
        potability (int): Potabilidade
        
    Returns:
        dict: representação da água e sua potabilidade
    """
    
    # Carregando modelo
    ml_path = 'ml_model/water_potability.pkl'
    modelo = Model.carrega_modelo(ml_path)
    
    agua = Agua(
        name=form.name.strip(),
        preg=form.preg,
        plas=form.plas,
        pres=form.pres,
        skin=form.skin,
        test=form.test,
        mass=form.mass,
        pedi=form.pedi,
        age=form.age,
        outcome=Model.preditor(modelo, form)
    )
    logger.debug(f"Adicionando água de nome: '{agua.name}'")
    
    try:
        # Criando conexão com a base
        session = Session()
        
        # Checando se agua já existe na base
        if session.query(Agua).filter(Agua.name == form.name).first():
            error_msg = "Água já existente na base :/"
            logger.warning(f"Erro ao adicionar água '{agua.name}', {error_msg}")
            return {"message": error_msg}, 409
        
        # Adicionando agua
        session.add(agua)
        # Efetivando o comando de adição
        session.commit()
        # Concluindo a transação
        logger.debug(f"Adicionado água de nome: '{agua.name}'")
        return apresenta_agua(agua), 200
    
    # Caso ocorra algum erro na adição
    except Exception as e:
        error_msg = "Não foi possível salvar novo item :/"
        logger.warning(f"Erro ao adicionar água '{agua.name}', {error_msg}")
        return {"message": error_msg}, 400
    

# Métodos baseados em nome
# Rota de busca de agua por nome
@app.get('/agua', tags=[agua_tag],
         responses={"200": AguaViewSchema, "404": ErrorSchema})
def get_agua(query: AguaBuscaSchema):    
    """Faz a busca por uma água cadastrada na base a partir do nome

    Args:
        name (str): nome da água
        
    Returns:
        dict: representação da água e sua potabilidade
    """
    
    agua_nome = query.name
    logger.debug(f"Coletando dados sobre a água #{agua_nome}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    agua = session.query(Agua).filter(Agua.name == agua_nome).first()
    
    if not agua:
        # se o agua não foi encontrado
        error_msg = f"Água {agua_nome} não encontrada na base :/"
        logger.warning(f"Erro ao buscar água '{agua_nome}', {error_msg}")
        return {"mesage": error_msg}, 404
    else:
        logger.debug(f"Água encontrada: '{agua.name}'")
        # retorna a representação do agua
        return apresenta_agua(agua), 200
   
    
# Rota de remoção de agua por nome
@app.delete('/agua', tags=[agua_tag],
            responses={"200": AguaViewSchema, "404": ErrorSchema})
def delete_agua(query: AguaBuscaSchema):
    """Remove uma água cadastrada na base a partir do nome

    Args:
        name (str): nome do água
        
    Returns:
        msg: Mensagem de sucesso ou erro
    """
    
    agua_nome = unquote(query.name)
    logger.debug(f"Deletando dados sobre a água #{agua_nome}")
    
    # Criando conexão com a base
    session = Session()
    
    # Buscando agua
    agua = session.query(Agua).filter(Agua.name == agua_nome).first()
    
    if not agua:
        error_msg = "Água não encontrada na base :/"
        logger.warning(f"Erro ao deletar água '{agua_nome}', {error_msg}")
        return {"message": error_msg}, 404
    else:
        session.delete(agua)
        session.commit()
        logger.debug(f"Deletada água #{agua_nome}")
        return {"message": f"Água {agua_nome} removida com sucesso!"}, 200