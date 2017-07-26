//$scope - é uma ponte de ligação entre o controller e a view, ou seja, td que for declarado no obj vai aparecer na view
//$http - usado para requisições de dados no servidor
//$routeParams - busca o ID no servidor
//recursoFoto - é o nosso injetor
//cadastroDeFotos - novo serviço
angular.module('alurapic')
		.controller('FotoController', ['$scope', 'recursoFoto', 'cadastroDeFotos', '$routeParams', function($scope, recursoFoto, cadastroDeFotos, $routeParams) {

		$scope.foto = {};//objeto
		$scope.mensagem = '';//string para passa msg em tela de aviso

		//trocando codigo $http por $resource
		if($routeParams.fotoId) {
			recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
				$scope.foto = foto;
			}, function(erro) {
				console.log(erro);
					$scope.mensagem = 'Não foi possivel cadastrar a foto'
			});
		}

		/*//combinado com o coringa para resgatar o ID
		//condição que qd sucesso, buscamos a foto no servidor através de $http.get
		if($routeParams.fotoId) {
			$http.get('/v1/fotos/' + $routeParams.fotoId)
				.success(function(foto) {
					$scope.foto = foto;
				})
				.error(function(erro) {
					console.log(erro);
					$scope.mensagem = 'Não foi possivel cadastrar a foto';
				});
		}*/

		//função que recebe dados do formulario
		$scope.submeter = function() {
			//condição que testa se o ID existe, se nao ele cria um novo e se ja existe faz a edição da foto
			//para alterar foi usado $http.put e inserir $http.post
			if($scope.formulario.$valid) {
				//novo serviço que substituí e tirna o codigo mais legivel
				cadastroDeFotos.cadastrar($scope.foto)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.foto = {}; //limpa apos a inclusao
					//propriedade que faz o if true or false do para implementar o focus
					$scope.focado = true;
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}

				/*//codigo substituido por cadastroDeFotos
				//testa se dados do formularios sao null
				if ($routeParams.fotoId) {

					//codigo $resouce
					recursoFoto.update({fotoId: $scope.foto._id},
						$scope.foto, function() {
							$scope.mensagem = 'Foto alterada com sucesso';
					},function(erro) {
						console.log(erro);
						$scope.mensagem = 'Não foi possivel alterar';
					});*/


					/*$http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
					.success(function() {
						$scope.mensagem = 'Foto alterada com sucesso';
					})
					.error(function(erro) {
						console.log(erro);
						$scope.mensagem = 'Não foi possivel alterar';
					});*/
					//codigo substituido por cadastroDeFotos
				/*} else {

					//codigo $resource
					//recurso save, gera pode debaixo uma requisição POST
					recursoFoto.save($scope.foto, function() {
						$scope.foto = {};//limpa o formulario apos salvar
						$scope.mensagem = 'Foto adicionada com sucesso';
					}, function(erro) {
						console.log(erro);
						$scope.mensagem = 'Não foi possivel cadastrar a foto';
					});*/

					/*$http.post('/v1/fotos/', $scope.foto)
					.success(function() {
						$scope.foto = {};//limpa o formulario apos salvar
						$scope.mensagem = 'Foto adicionada com sucesso';
					})
					.error(function(erro) {
						console.log(erro);
						$scope.mensagem = 'Não foi possivel cadastrar a foto';
					});
				}*/

		};//fecha o submeter
}]);//fecha controller
