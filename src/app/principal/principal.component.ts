import { Component } from '@angular/core';
import { Cliente } from '../Modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //objeto do tipo cliente
  cliente = new Cliente();

  //variavel para visibilidade dos botoes 
  btnCadastro:boolean = true;

  //variavel para visibilidade da tabela
  tabela:boolean = true;

  //json de clientes
  clientes:Cliente[] = [];

  //construtor
  constructor(private servico:ClienteService){ }
  //metodo para selecionar os clientes
  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }
  //metodo de cadastro
  cadastrar():void{
    this.servico.cadastrar(this.cliente).subscribe(retorno =>{
      //cadastrar o cliente no vetor
      this.clientes.push(retorno);
      //limpar formulario
      this.cliente = new Cliente();
      alert('Cliente Cadastrado com sucesso!');
    });
  }

  //metodo para selecionar um cliente especifico
  selecionarCliente(posicao:number):void{

    //selecionar cliente no vetor
    this.cliente = this.clientes[posicao];
    //visibilidade dos botoes
    this.btnCadastro = false;
    //visibilidade da tabela
    this.tabela = false;

  }

  //metodo para editar clientes
  editar():void{
    this.servico.editar(this.cliente).subscribe(retorno => {
      //obter posição do vetor onde esta o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });
      //alterar os dados do cliente no vetor 
      this.clientes[posicao] = retorno;
      //limpar fomulario
      this.cliente = new Cliente();

      //visibilidade dos botoes
      this.btnCadastro = true;
      //visibilidade da tabela
      this.tabela = true;

      alert('Cliente alterado com sucesso!');
    });
  }
  //metodo para remover clientes
  remover():void{
    this.servico.remover(this.cliente.codigo).subscribe(retorno => {
      //obter posição do vetor onde esta o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo;
      });
      //excluindo cliente no vetor 
      this.clientes.splice(posicao,1);
      //limpar fomulario
      this.cliente = new Cliente();
      //visibilidade dos botoes
      this.btnCadastro = true;
      //visibilidade da tabela
      this.tabela = true;

      alert('Cliente Removido com sucesso!');
    });
  }

  //metodo para cancelar alterações
  cancelar():void{

    //limpa o formulario 
    this.cliente = new Cliente();
    //visibilidade dos botoes
    this.btnCadastro = true;
    //visibilidade da tabela
    this.tabela = true;

  }



  //metodo de inicialização 
  ngOnInit(){
    this.selecionar();
  }


}
