from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base

class Agua(Base):
    __tablename__ = 'aguas'
    id = Column(Integer, primary_key=True)
    name = Column("Name", String(50))
    ph = Column("ph", Float)
    hardness = Column("Hardness", Float)
    solids = Column("Solids", Float)
    chloramines = Column("Chloramines", Float)
    sulfate = Column("Sulfate", Float)
    conductivity = Column("Conductivity", Float)
    organic_carbon = Column("Organic_carbon", Float)
    trihalomethanes = Column("Trihalomethanes", Float)
    turbidity = Column("Turbidity", Float)
    potability = Column("Potability", Integer, nullable=True)
    data_insercao = Column(DateTime, default=datetime.now())
    
    def __init__(self, name:str, ph:float, hardness:float, solids:float, chloramines:str,
                 sulfate:float, conductivity:float, organic_carbon:float, 
                 trihalomethanes:float, turbidity:float, potability:int, 
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria uma água

        Arguments:
            name: nome da água
            ph = Column("ph", Float)
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
        self.data_insercao = Column(DateTime, default=datetime.now())

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao