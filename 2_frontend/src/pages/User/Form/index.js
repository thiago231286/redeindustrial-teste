import React from 'react'
import api from '../../../services/api'
import FormView from './FormView'


export default (props) => {

   /*--- STATES ---*/
   // controle de visualização de mensagem na tela
   const [show, setShow] = React.useState({ show: false, variant: '', });
   // controle de efeito loading
   const [loading, setLoading] = React.useState(true)
   // controle validação do formulário
   const [validated, setValidated] = React.useState(false)
   // 
   const [user, setUser] = React.useState({
      id: 0,
      nome: null,
      email: null,
      fone: null,
      foto: null,
   })
   const [fotoView, setFotoView] = React.useState({
      fotoBase64: null
   });

   // referência para campo de input file "seleção de foto do perfil"
   let inputFile = React.createRef();

   React.useEffect( () => {
      getUser()
   }, [])

   /*--- Função para redirecionar ---*/
   const redirectUrl = url => {
      props.history.push(url)
   }

   // --- Fn que chama o endpoint com todos os registros da tabela users
   const getUser = async () => {

      setLoading(true)

      // verifica se foi passado o parametro ID do usuário
      if (props.match.params.action === "edit" && typeof props.match.params.id !== "undefined") {
         // busca os dados do usuário pelo ID
         try {
            const {data} = await api.get(`/users/${props.match.params.id}`)
            setUser(data[0])
            setFotoView({ fotoBase64: data[0].foto });
         } catch( err ) {
            console.error(err)
         }

      }

      setLoading(false)

   }

   // --- Fn limpar a imagem do usuário
   const clearImageSelection = () => {
      setFotoView({ fotoBase64: null })
      setUser({
         ...user,
         foto: null
      })
   }

   // --- Fn submit dados no servidor
   const submitForm = async event => {

      event.preventDefault();

      const form = event.currentTarget;

      if (form.checkValidity() === false) {
         
         event.stopPropagation();
         setValidated(true);
      } else {
         console.log('Valido form')
         setLoading(true)

         const formData = new FormData();
         Object.keys(user).forEach(key => formData.append(key, user[key]));

         try {
            const {data} = await api.post('/users', formData)

            if(data.success === true){

               // mostrando mensagem na tela que o usuário foi removido
               setShow({
                  show: true,
                  variant: 'success',
                  msg: 'Operação realizada com sucesso.'
               });
               // ocultando a mensagem da tela após 3 segundos
               setTimeout(() => {
                  setShow({ ...show, show: false});
                  redirectUrl('/')
               }, 3000);
               
            }
         } catch(err){
            console.log(err)
         }

         setLoading(false)
      }
   }


   // --- Fn para atualizar state com dados do formulário
   const handleChange = name => event => {
      setUser({
         ...user,
         [name]: event.target.value
      });
   }

   // Fn para atualizar o state com a foto do usuário no formulário
   const handleImageChange = e => {
      setUser({
         ...user,
         foto: e.target.files[0]
      })
      
      /* atualiza o preview da foto */
      const reader = new FileReader();

      reader.onload = (event) => {
         setFotoView({ fotoBase64: event.target.result });
      };

      if( e.target.files[0] ) {
         reader.readAsDataURL(e.target.files[0]);
      } else {
         setFotoView({ fotoSize: 0, fotoBase64: null });
      }

   }

   // --- Fn aciona event click no input file escondido
   const openFile = () => {
      inputFile.current.click()
   }

   return (
      <FormView
         user={user}
         loading={loading}
         show={show}
         validated={validated}
         getUser={getUser}
         submitForm={submitForm}
         handleChange={handleChange}
         redirectUrl={redirectUrl}

         ref={inputFile}
         fotoView={fotoView}
         openFile={openFile}
         clearImageSelection={clearImageSelection}
         handleImageChange={handleImageChange}
      />
   )
}