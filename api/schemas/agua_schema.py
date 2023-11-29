from pydantic import BaseModel
from typing import Optional, List
from model.agua import Agua
import json
import numpy as np

class AguaSchema(BaseModel):
    """ Define como uma nova água a ser inserida deve ser representada
    """
    name: str = "Água da nascente de São Gonçalo"
    ph: float = 0.627
    hardness: float = 0.627
    solids: float = 0.627
    chloramines: float = 0.627
    sulfate: float = 0.627
    conductivity: float = 0.627
    organic_carbon: float = 0.627
    trihalomethanes: float = 0.627
    turbidity: float = 0.627
    potability: int = 1
    
class AguaViewSchema(BaseModel):
    """Define como uma água será retornada
    """
    id: int = 7
    name: str = "Água da nascente de São Gonçalo"
    ph: float = 0.627
    hardness: float = 0.627
    solids: float = 0.627
    chloramines: float = 0.627
    sulfate: float = 0.627
    conductivity: float = 0.627
    organic_carbon: float = 0.627
    trihalomethanes: float = 0.627
    turbidity: float = 0.627
    potability: int = None
    
class AguaBuscaSchema(BaseModel):
    """Define como deve ser a estrutura que representa a busca.
    Ela será feita com base no nome da água.
    """
    name: str = "Água da nascente de São Gonçalo"

class ListaAguasSchema(BaseModel):
    """Define como uma lista de águas será representada
    """
    aguas: List[AguaSchema]

    
class AguaDelSchema(BaseModel):
    """Define como uma água para deleção será representada
    """
    name: str = "Água da nascente de São Gonçalo"
    
# Apresenta apenas os dados de um agua    
def apresenta_agua(agua: Agua):
    """ Retorna uma representação da gua seguindo o schema definido em
        AguaViewSchema.
    """
    return {
        "id": agua.id,
        "name": agua.name,
        "ph": agua.ph,
        "hardness": agua.hardness,
        "solids": agua.solids,
        "chloramines": agua.chloramines,
        "sulfate": agua.sulfate,
        "conductivity": agua.conductivity,
        "organic_carbon": agua.organic_carbon,
        "trihalomethanes": agua.trihalomethanes,
        "turbidity": agua.turbidity,
        "potability": agua.potability,
    }
    
# Apresenta uma lista de aguas
def apresenta_aguas(aguas: List[Agua]):
    """ Retorna uma representação do agua seguindo o schema definido em
        AguaViewSchema.
    """
    result = []
    for agua in aguas:
        result.append({
            "id": agua.id,
            "name": agua.name,
            "ph": agua.ph,
            "hardness": agua.hardness,
            "solids": agua.solids,
            "chloramines": agua.chloramines,
            "sulfate": agua.sulfate,
            "conductivity": agua.conductivity,
            "organic_carbon": agua.organic_carbon,
            "trihalomethanes": agua.trihalomethanes,
            "turbidity": agua.turbidity,
            "potability": agua.potability,
        })

    return {"aguas": result}

