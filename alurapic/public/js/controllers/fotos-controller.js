/* qd nao declaramos um array vazio no parametro do modulo, falamos que queremos acessar o módulo
 * o controller receber 2 parâmetros,1(nome do controller com convenção "PascalCase")e 2(a função que define o controller)
 * $scope - é uma ponte de ligação entre o controller e a view, ou seja, td que for declarado no obj vai aparecer na view
 * $http - usado para requisições de dados no servidor
 * $resource - torna mais suncito o codigo e de facil modificação, logo tem a msm funcionalidae do $http e irá substituir o msm
 */
angular.module('alurapic')
	.controller('FotosController', function($scope, recursoFoto) {

	/*$scope.foto = {
		titulo : 'Leão',
		url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
	};*/
	//criando um array
	$scope.fotos = [];
	//o ng-model da view interage aqui
	$scope.filtro = '';//string
	$scope.mensagem = '';

	/* $http.get nos retorna é uma promessa de que ele buscará os dados
	 * função "then" acessa os dados retornados
	 * função .catch que nos fornecerá um objeto com informações do erro que ocorreu

	$http.get('/v1/fotos')
	.then(function(retorno) {
		$scope.fotos = retorno.data;//o "data", acessa os dados retornado
	})
	.catch(function(erro) {
		console.log(erro)
	});*/

	//melhorando o cod com resource
	//o cod com o get foi substituido e usado a query para busca os dados
	recursoFoto.query(function(fotos) {
		$scope.fotos = fotos;
	}, function(erro) {
		console.log(erro);
	});

	/*//tornando o codigo mais legivel e nao usando o .data
	$http.get('/v1/fotos/')
	.success(function(retorno) {
		$scope.fotos = retorno;
	})
	.error(function(erro) {
		console.log(erro)
	});*/

	$scope.remover = function(foto) {
		//trocamos o $http por $resouce
		//utilizamos um recurso menos verboso e especializado para consumir dados do servidor
		recursoFoto.delete({fotoId: foto._id}, function() {
			//requisita novamente a lista atualizando a pagina
			var indiceDaFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceDaFoto, 1);
			$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
		});


		/*usando recursos rest, deletetamos e passamos como paramêtro o banco e o coringa que vai acha o id
		$http.delete('/v1/fotos/' + foto._id)
		.success(function() {
			//requisita novamente a lista atualizando a pagina
			var indiceDaFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceDaFoto, 1);
			$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
		})
		.error(function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
		});*/
	};

});
