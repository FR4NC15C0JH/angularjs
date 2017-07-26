angular.module('minhasDiretivas', [])
	.directive('meuPainel', function() {
		//objeto - directive definition object (DDO)
		var ddo = {};
		//criando restrição
		ddo.restrict = 'AE'; //Angular Expression
		//usada para preserva td o conteúdo original da diretiva
		ddo.transclude = true;
		/* 
		 * criando um scope restrito para acesso da diretiva
		 * a sintaxe @ indica que estamos copiando o valor como string do atributo titulo adicionando na diretiva em nossa marcação
		*/ 
		ddo.scope = {
			titulo: '@'
		}
		/*definição HTML que será usada pelo diretiva e scopo
		ddo.template = 
                '<div class="panel panel-default">'
            +   '   <div class="panel-heading">'
            +   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
            +   '   </div>'
            +   '   <div class="panel-body" ng-transclude>'
            +   '   </div>'
            +   '</div>'
		*/
		//serparando o html do angular
		ddo.templateUrl = 'partials/meu-painel.html';

		return ddo;
	})
	//diretiva para page foto.hmtl
	.directive('minhaFoto', function() {

		var ddo = {};

		ddo.restrict = 'AE'; //Angular Expression

		ddo.scope = {
			titulo: '@',
			url: '@'
		}

		ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">'; 

		return ddo;
    })
    .directive('meuBotaoPerigo',  function() {

    	var ddo = {};

    	ddo.restrict = 'E'; //E - Expression
    	ddo.scope = { 
    		nome: '@',//@ copia o valor passado para a diretiva e guarda em scopo isoaldo do tipo string
    		acao: '&'//& é usado qd estamos passando uma expressão pela diretiva, acao() e remover(foto) 
    	}
    	//html e bootstrap tirado da page e substituida pela diretiva
    	ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

    	return ddo;
    })
    //diretiva que manipula o DOM, mudando o focu do botao apos salvar
    .directive('meuFocus', function() {
    	var ddo = {};
    	ddo.restrict = 'A';
    	ddo.scope = {
    		focado: '=' //ele criará uma relação bidirecional, FotoController e diretiva meuFocus usaram a msm referência 
    	};
    	/*responsável por acessar o elemento do DOM
    	  toda diretiva processada pelo Angular passa por duas fases: 
    	  compile e link. O retorno da fase compile sempre devolve uma função de link */
    	ddo.link = function(scope, element) {
    		//não precisamos configurar um escopo isolado. 
    		//Em seguida, usamos scope.$on para ouvir o evento fotoCadastrada que será disparado pelo nosso controller.
    		scope.$on('fotoCadastrada', function() {
    			element[0].focus();
    		});

    		/* o uso de $watches, pode causar lentidao na nossa view 
    		//$watch - é um observado do Angular, que identifica a diretiva qd mudar pra true or false
    		scope.$watch('focado', function() {

    			if (scope.focado) {
    				//element é um elemento DOM, porém encapsulado pelo jqLite, que é uma API de manipulação do DOM
    				// ignifica que estamos acessando diretamente o elemento do DOM encapsulado pelo jqLite, 
    				// sendo assim, podemos chamar a função focus() diretamente no elemento.
    				element[0].focus();
    				scope.focado = false;
    			}
    		});*/
    	};// fim do ddo.link

    	return ddo;
    });

    /*
    Usamos '@'quando queremos realizar uma cópia do valor passado para a diretiva no HTML para dentro do escopo isolado na diretiva. 
    Essa cópia é sempre um valor em string.

	Usamos '&' geralmente quando queremos executar dentro de uma diretiva uma função que pertence a um escopo pai, o de um controller.

	Usamos '='' quando queremos que tanto a diretiva quanto o controller acessem o mesmo dado, 
	isto é, qualquer alteração no escopo privado da diretiva afetará a propriedade do controller
	 e qualquer alteração nesta propriedade no controller afetará a diretiva. Temos aqui uma comunicação bidirecional.
	*/ 