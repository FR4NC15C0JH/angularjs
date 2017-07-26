//escopo global "angular"
//função "module" cria modulos
//a função module recebe 2 parâmetros, 1(nome do modulo) e 2(um array com todos os modulos de que nosso modulo depende)
//ngAnimate - algumas diretivas do Angular passam a adicionar ou remover classes automaticamente sem a nossa ciência
//ngRoute - modulo de que roteia as paginas hmtl pelo Single Page Applications
angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute','meusServicos']) 
	//serviço $routeProvider, que obtemos através do sistema de injeção de dependências do Angular, dentro da função config
	//$locationProvider - ativa o History API do HTML5
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);
		//aqui criamos a rota para a pagina, com url do que vai novegador, caminho do html e o controller do mesmo.
		$routeProvider.when('/fotos', {
			templateUrl: 'partials/principal.html',
			controller: 'FotosController'
		});
		//nova rota e pagina
		$routeProvider.when('/fotos/new', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});
		//rota para editar as fotos, usamos um coringa no final do parametro
		/*o curinga :fotoId que serve para duas coisas: indicar que a rota pode aceitar qualquer valor na posição do curinga 
		  e para indicar como teremos acesso ao parâmetro passado em nossos controllers.*/
		$routeProvider.when('/fotos/edit/:fotoId', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});
		//criando um redirect para a pagina principal
		$routeProvider.otherwise({redirectTo: '/fotos'});
});