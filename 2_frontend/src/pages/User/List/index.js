import React from 'react'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import api from '../../../services/api'
import ListView from './ListView'

export default (props) => {


   let regiaoPrint = React.createRef();

   /*--- States ---*/
      // controle de visualiação do component Loading 
      const [loading, setLoading] = React.useState(true)

      // guarda os registros da tabela users do banco de dados
      const [users, setUsers] = React.useState([])

      // controle de visualização de mensagem na tela
      const [show, setShow] = React.useState({
         show: false,
         variant: '',
      });
   /*--- fim ---*/

   /*--- Hooks ---*/
   React.useEffect( () => {
      getUsers() // função para buscar todos os registros da tabela users no banco de dados
   }, [])

   /*--- Função para redirecionar ---*/
   const redirectUrl = url => {
      props.history.push(url)
   }

   /*--- Função que remove um usuário da tabela users no banco de dados ---*/
   const deleteUser = async (userId, key) => {

      setLoading(true) // mostrando o loading

      try {

         // endpoint para remover o usuário do banco de dados
         const {data} = await api.delete(`/users/${userId}`)

         if( data.success ) {
            /* entra se o usuário foi removido com sucesso */

            /* removendo o usuário do state */
            let _users_ = users // copiando o state
            _users_.splice(key, 1) // removendo o usuário
            setUsers(_users_) // atualizando o state
   
            /* mostrando mensagem na tela que o usuário foi removido */
            setShow({
               show: true,
               variant: 'success',
               msg: 'Registro apagado com sucesso.'
            });
            /* ocultando a mensagem da tela após 3 segundos */
            setTimeout(() => {
               setShow({ ...show, show: false});
            }, 3000);
         } else {
            /* entra se o usuário não foi removido */

            /* mostrando mensagem na tela que o usuário foi removido */
            setShow({
               show: true,
               variant: 'warning',
               msg: 'Erro ao apagar o registro.'
            });
            /* ocultando a mensagem da tela após 3 segundos */
            setTimeout(() => {
               setShow({ ...show, show: false});
            }, 3000);

         }

      } catch(err){
         console.log(err)
      }
      
      setLoading(false) // ocultando o loading

   }

   /*--- Função que busca todos os registros da tabela users no banco de dados ---*/
   const getUsers = async () => {

      setLoading(true) // mostrando o loading

      try {
         // endpoint: listando todos os registro da tabela users do banco de dados
         const {data} = await api('/users')
         setUsers(data.data) // atualizando o state
      } catch( err ) {
         console.error(err)
      }

      setLoading(false) // ocultando o loading

   }

   /*--- Função que gera o PDF da tela ---*/
   const savePDF = () => {

      // gerando nome para o arquivo PDF
      let nameFile = `user-list-${Math.floor(Math.random() * 10000) + 1}.pdf`
      
      setLoading(true); // mostra o efeito loading na tela

      // gera uma imagem da tela e cria um PDF
      html2canvas(document.body).then(function (canvas) {
         var img = canvas.toDataURL("image/png");
         var doc = new jsPDF('l', 'mm', 'a4');
         doc.addImage(img, 'JPEG', 0, 0, 297, 100);
         doc.save(nameFile);
         setLoading(false); // oculta o efeito loading da tela 
     });
   }

   /*--- View ---*/
   return (
      <ListView
         users={users}
         loading={loading}
         show={show}
         redirectUrl={redirectUrl}
         getUsers={getUsers}
         deleteUser={deleteUser}
         savePDF={savePDF}
         ref={regiaoPrint}
      />
   )
}