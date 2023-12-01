
/*
  --------------------------------------------------------------------------------------
  Funções globais
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Função para abrir modal
  --------------------------------------------------------------------------------------
*/
function openModal(mn) {
  let modal = document.getElementById(mn);

  if (typeof modal == 'undefined' || modal === null)
      return;

  modal.style.display = 'Block';
  document.body.style.overflow = 'hidden';
}

/*
  --------------------------------------------------------------------------------------
  Função para fechar modal
  --------------------------------------------------------------------------------------
*/
function closeModal(mn) {
  let modal = document.getElementById(mn);

  if (typeof modal == 'undefined' || modal === null)
      return;

  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar tabela
  --------------------------------------------------------------------------------------
*/
const limparLista = (tabela) => {		  
  let tabela_element = document.getElementById("tabela-"+ tabela);
  let header_element = document.getElementById("header-"+ tabela);
  tabela_element.innerHTML = "<tbody>"+ header_element.outerHTML +"</tbody>";
}

/*
  --------------------------------------------------------------------------------------
  Fim Funções globais
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Funções Agua
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de aguas existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListAgua = async () => {
  let url = 'http://127.0.0.1:5000/aguas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {	
      limparLista("agua");
	  if(data.message !== undefined){
		  alert(data.message);
		  return;
	  }
      data.aguas.forEach(item => insertListAgua(item.id, item.name, item.ph, item.hardness, item.solids, item.chloramines, item.sulfate, item.conductivity, item.organic_carbon, item.trihalomethanes, item.turbidity, item.data_insercao, item.potability))
      //getCountAguaBloqueados();
    })
    .catch((error) => {
      alert(error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter um agua existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getAgua = async (idAgua) => {
  let url = 'http://127.0.0.1:5000/agua?id=' + idAgua;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
		document.getElementById("idAgua").value = data.id
		document.getElementById("name").value = data.name
		document.getElementById("ph").value = data.ph
		document.getElementById("hardness").value = data.hardness
        document.getElementById("solids").value = data.solids
		document.getElementById("chloramines").value = data.chloramines
		document.getElementById("sulfate").value = data.sulfate
		document.getElementById("conductivity").value = data.conductivity
		document.getElementById("organic_carbon").value = data.organic_carbon
		document.getElementById("trihalomethanes").value = data.trihalomethanes
		document.getElementById("turbidity").value = data.turbidity
    })
    .catch((error) => {
      alert(error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um item na lista de aguas do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postItemAgua = async (inputName, 
								 inputPh, 
								 inputHardness,
								 inputSolids,
								 inputChloramines, 
								 inputSulfate,
								 inputConductivity, 
							     inputOrganicCarbon, 
							     inputTrihalomethanes, 
							     inputTurbidity) => {
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('ph', inputPh);
  formData.append('hardness', inputHardness);
  formData.append('solids', inputSolids);
  formData.append('chloramines', inputChloramines);
  formData.append('sulfate', inputSulfate);
  formData.append('conductivity', inputConductivity);
  formData.append('organic_carbon', inputOrganicCarbon);
  formData.append('trihalomethanes', inputTrihalomethanes);
  formData.append('turbidity', inputTurbidity);


  let url = 'http://127.0.0.1:5000/agua';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => console.log(response.json()))
	.then((data) => {
	alert("Água cadastrada com suscesso!");
    closeModal('dv-modal-agua-cadastro');
    getListAgua();
  })
  .catch((error) => {
    alert(error);
  });
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar um item na lista de aguas do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const putItemAgua = async (idAgua, 
								inputName, 
								inputPh, 
								inputHardness, 
								inputSolids,
								inputChloramines, 
								inputSulfate,
								inputConductivity, 
							    inputOrganicCarbon, 
							    inputTrihalomethanes, 
							    inputTurbidity, 
							    inputEstado) => {
  const formData = new FormData();
  formData.append('id', idAgua);
  formData.append('name', inputName);
  formData.append('ph', inputPh);
  formData.append('hardness', inputHardness);
  formData.append('solids', inputSolids);
  formData.append('chloramines', inputChloramines);
  formData.append('sulfate', inputSulfate);
  formData.append('conductivity', inputConductivity);
  formData.append('organic_carbon', inputOrganicCarbon);
  formData.append('trihalomethanes', inputTrihalomethanes);
  formData.append('turbidity', inputTurbidity);

  let url = 'http://127.0.0.1:5000/agua';
  fetch(url, {
    method: 'put',
    body: formData
  })
  .then((response) => response.json())
	.then((data) => {
	alert("Água atualizada com suscesso!");
    getListAgua();
  })
  .catch((error) => {
    alert(error);
  });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a quantidade de aguas bloqueados existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getCountAguaBloqueados = async () => {
  let url = 'http://127.0.0.1:5000/agua/lista/count/bloqueados';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("countAgua").innerHTML = data.count;
    })
    .catch((error) => {
      alert(error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista de aguas do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItemAgua = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/agua?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Água removida com suscesso!");
      closeModal('dv-modal-agua-cadastro');
      getListAgua();    
    })
    .catch((error) => {
      alert(error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de remove para cada item da lista de agua
  --------------------------------------------------------------------------------------
*/
const insertButtonRemoveAgua = (parent, id) => {
  parent.className = "colunaCenter";
  let span = document.createElement("span");
  span.className = "close";
  span.innerHTML = '<img src="img/excluir.png" width="24px" height="24px"></img>';
  parent.appendChild(span);
  span.onclick = function () {
    let div = this.parentElement.parentElement;
    if (confirm("Você tem certeza?")) {
	    deleteItemAgua(id)
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de editar para cada item da lista de agua
  --------------------------------------------------------------------------------------
*/
const insertButtonEditAgua = (parent, id) => {
  parent.className = "colunaCenter";
  let span = document.createElement("span");
  span.className = "edit";
  span.innerHTML = '<img src="img/editar.png" width="24px" height="24px"></img>';
  parent.appendChild(span);
  span.onclick = function () {
    limparFormAgua();
	  showBtnEditarAgua();
    getAgua(id)	  
    openModal('dv-modal-agua-cadastro');
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para um badge do hardness do item da lista de agua
  --------------------------------------------------------------------------------------
*/
const insertPotabilidadeAgua = (parent, texto) => {
  parent.className = "colunaCenter";
  let span = document.createElement("span");
  if(texto == 1){
    span.className = "badge badge-verde";
	span.innerHTML = "Potável";
  } else {
    span.className = "badge badge-vermelho";
	span.innerHTML = "Não Potável";
  }
  
  
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar formulário, apresentar botão de salvar e abrir o modal cadastro agua
  --------------------------------------------------------------------------------------
*/
const cadastrarNovoRegistroAgua = () => {
  //limparFormAgua();
	showBtnSalvarAgua();  
  openModal('dv-modal-agua-cadastro');
}

/*
  --------------------------------------------------------------------------------------
  Função para abrir o modal lista agua
  --------------------------------------------------------------------------------------
*/
const abrirCadastroAgua = () => {
  getListAgua();
  openModal('dv-modal-agua');
}

/*
  --------------------------------------------------------------------------------------
  Função para validação do formulário de agua
  --------------------------------------------------------------------------------------
*/
const validarFormAgua = () => {
		
  let inputName = document.getElementById("name").value;
  let inputPh = document.getElementById("ph").value;
  let inputHardness = document.getElementById("hardness").value;
  let inputSolids = document.getElementById("solids").value;
  let inputChloramines = document.getElementById("chloramines").value;
  let inputSulfate = document.getElementById("sulfate").value;
  let inputConductivity = document.getElementById("conductivity").value;
  let inputOrganicCarbon = document.getElementById("organic_carbon").value;
  let inputTrihalomethanes = document.getElementById("trihalomethanes").value;
  let inputTurbidity = document.getElementById("turbidity").value;
  
  if (inputName === '') {
    alert("Escreva o NOME da agua!");
	return false;
  } 
  if (inputPh === '') {
    alert("O campo PH é obrigatório!");
	return false;
  } 
  if (inputHardness === '') {
    alert("O campo Dureza é obrigatório!");
	return false;
  }
  if (inputSolids === '') {
    alert("O campo Sólidos é obrigatório!");
	return false;
  }
  if (inputChloramines === '') {
    alert("O campo Cloraminas é obrigatório!");
	return false;
  }
  if (inputSulfate === '') {
    alert("O campo Sulfato é obrigatório!");
	return false;
  }
  if (inputConductivity === '') {
    alert("O campo Condutividade é obrigatório!");
	return false;
  }
  if (inputOrganicCarbon === '') {
    alert("O campo Carbono Orgânico é obrigatório!");
	return false;
  }
  if (inputTrihalomethanes === '') {
    alert("O campo Trihalometanos é obrigatório!");
	return false;
  }
  if (inputTurbidity === '') {
    alert("O campo Turbidez é obrigatório!");
	return false;
  }
  return true;
}

/*
  --------------------------------------------------------------------------------------
  Função para salvar um agua no servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const salvarAgua = () => {		
  if(!validarFormAgua()){
    return;
  }		
  let inputName = document.getElementById("name").value;
  let inputPh = document.getElementById("ph").value;
  let inputHardness = document.getElementById("hardness").value;
  let inputSolids = document.getElementById("solids").value;
  let inputChloramines = document.getElementById("chloramines").value;
  let inputSulfate = document.getElementById("sulfate").value;
  let inputConductivity = document.getElementById("conductivity").value;
  let inputOrganicCarbon = document.getElementById("organic_carbon").value;
  let inputTrihalomethanes = document.getElementById("trihalomethanes").value;
  let inputTurbidity = document.getElementById("turbidity").value;

  if (confirm("Você tem certeza deseja salvar?")) {
    postItemAgua(inputName, 
					  inputPh, 
					  inputHardness,
					  inputSolids,					  
					  inputChloramines, 
					  inputSulfate,
					  inputConductivity, 
					  inputOrganicCarbon, 
					  inputTrihalomethanes, 
					  inputTurbidity)
    limparFormAgua();
	return
  }	
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um agua no servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const editarAgua = () => {	
  validarFormAgua();		
  let idAgua = document.getElementById("idAgua").value;	
  let inputName = document.getElementById("name").value;
  let inputPh = document.getElementById("ph").value;
  let inputHardness = document.getElementById("hardness").value;
  let inputSolids = document.getElementById("solids").value;
  let inputChloramines = document.getElementById("chloramines").value;
  let inputSulfate = document.getElementById("sulfate").value;
  let inputConductivity = document.getElementById("conductivity").value;
  let inputOrganicCarbon = document.getElementById("organic_carbon").value;
  let inputTrihalomethanes = document.getElementById("trihalomethanes").value;
  let inputTurbidity = document.getElementById("turbidity").value;
 
  if (confirm("Você tem certeza deseja editar?")) {
	  putItemAgua(idAgua, 
					   inputName, 
					   inputPh, 
					   inputHardness, 
					   inputSolids,
					   inputChloramines,
					   inputSulfate,
					   inputConductivity, 
					   inputOrganicCarbon, 
					   inputTrihalomethanes, 
					   inputTurbidity)
	  return
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de agua apresentada
  --------------------------------------------------------------------------------------
*/
const insertListAgua = (id, name, ph, hardness, solids, chloramines, sulfate, conductivity, organicCarbon, trihalomethanes, turbidity, data_insercao, potability) => {
  var item = [id, name, ph, hardness, solids, chloramines, sulfate, conductivity, organicCarbon, trihalomethanes, turbidity, data_insercao, potability]
  var table = document.getElementById('tabela-agua');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
	if(i != 12){
		var cel = row.insertCell(i);	
		cel.textContent = item[i];
		if(i == 0){//ID
		  cel.id = "col"+item[i];
		}

		if(i == 11){//data_insercao
		  cel.className = "colunaCenter";
		}
	}
    
  }
  insertPotabilidadeAgua(row.insertCell(-1), potability)
  insertButtonEditAgua(row.insertCell(-1), item[0])
  insertButtonRemoveAgua(row.insertCell(-1), item[0]) 
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir botão de salvar do cadastro de agua
  --------------------------------------------------------------------------------------
*/
const showBtnSalvarAgua = () => {
  let btnSalvar = document.getElementById("btnSalvar");
	let btnEditar = document.getElementById("btnEditar");
	btnEditar.style.display = "none";
	btnSalvar.style.display = "block";
  limparFormAgua();
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir botão de editar do cadastro de agua
  --------------------------------------------------------------------------------------
*/
const showBtnEditarAgua = () => {
  let btnSalvar = document.getElementById("btnSalvar");
	let btnEditar = document.getElementById("btnEditar");
	btnEditar.style.display = "block";
	btnSalvar.style.display = "none";
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar formulário de agua
  --------------------------------------------------------------------------------------
*/
const limparFormAgua = () => {
  document.getElementById("name").value = "";
  document.getElementById("ph").value = "";
  document.getElementById("hardness").value = "";
  document.getElementById("solids").value = "";
  document.getElementById("idAgua").value = "";
  document.getElementById("chloramines").value = "";
  document.getElementById("sulfate").value = "";
  document.getElementById("conductivity").value = "";
  document.getElementById("organic_carbon").value = "";
  document.getElementById("trihalomethanes").value = "";
  document.getElementById("turbidity").value  = "";
  document.getElementById("turbidity").value = "";
}



/*
  --------------------------------------------------------------------------------------
  Fim Funções Agua
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Funções Acesso
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Função para obter a quantidade de acessos existente no servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getCountAcesso = async () => {
  let url = 'http://127.0.0.1:5000/acesso/lista/count';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("countAcesso").innerHTML = data.count;
    })
    .catch((error) => {
      alert(error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Fim Funções Acesso
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Chamada das funções para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
//getListStatusAgua();
//showBtnSalvarAgua();
getListAgua();






