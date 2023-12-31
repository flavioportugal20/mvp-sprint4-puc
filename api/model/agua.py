from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base

class Agua(Base):
    __tablename__ = 'aguas'
    id = Column(Integer, primary_key=True)
    name = Column(String(140), nullable=False)
    ph = Column(Float)
    hardness = Column(Float)
    solids = Column(Float)
    chloramines = Column(Float)
    sulfate = Column(Float)
    conductivity = Column(Float)
    organic_carbon = Column(Float)
    trihalomethanes = Column(Float)
    turbidity = Column(Float)
    potability = Column(Integer, nullable=True)
    data_insercao = Column(DateTime, default=datetime.now())
    
    def __init__(self, name:str, ph:float, hardness:float, solids:float, chloramines:float,
                 sulfate:float, conductivity:float, organic_carbon:float, 
                 trihalomethanes:float, turbidity:float, potability:int):
        """
        Cria uma água

        Arguments:
            name: nome da água
            ph = pH
            hardness = Dureza
            solids = Sólidos
            chloramines = Cloraminas
            sulfate = Sulfato
            conductivity = Condutividade
            organic_carbon = Carbono Orgânico
            trihalomethanes =Trihalometanos
            turbidity = Turbidez
            potability = Potabilidade
            data_insercao: Data de quando a água foi inserida à base
        """

        self.name = name
        self.ph = ph
        self.hardness = hardness
        self.solids = solids
        self.chloramines = chloramines
        self.sulfate = sulfate
        self.conductivity = conductivity
        self.organic_carbon = organic_carbon
        self.trihalomethanes = trihalomethanes
        self.turbidity = turbidity
        self.potability = potability