

const anchor = document.querySelectorAll('.anchor');

const  sections = document.querySelectorAll('section');

const pulseMyelements = document.querySelectorAll("#about-me p, #hard-skills, #soft-skills, #certificates, .about-img img, li i, .projeto img, .projeto h3, .projeto p, .projetos-grid, .projeto button, .container-four a, .social-inline i, .contacts-menssage label, .contacts-menssage input, .contacts-menssage textarea, .contacts-menssage button, .container-four")

const imgs = document.querySelectorAll(".myimg");

const aboutImg = document.getElementById('img-about')

//Elementos do formulário de contato.
const form = document.querySelector(".contact-form");

const nameInp = document.getElementById('nome');

const emailInp = document.getElementById('email');


const mensageInp = document.getElementById('mensagem');

const statusMs = document.getElementById('msg-status')

const btnEnviar = document.getElementById('submit');


  

//Adiciona animação quando as classe estao visivel.
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animar');

        } else{
            entry.target.classList.remove('animar');
        }
    });

}, {threshold: 0.4});

sections.forEach(section => {
    observer.observe(section)

})


//animation pulse elemnets
const pulseElente = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
             const delay = index * 0.01;
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('pulse');
            
        } else {
            entry.target.classList.remove('pulse');
            entry.target.style.transitionDelay = '0s';
        }
    });

}, {threshold: 0.2}) ;

pulseMyelements.forEach(pulseMyelement =>{
    pulseElente.observe(pulseMyelement)
}) 
   


//scroll

anchor.forEach((anchors) => {

    anchors.addEventListener("click", (e) => {
     e.preventDefault();
     
     const idElement = anchors.getAttribute('href');
     const anchorElementId = document.querySelector(idElement); 

     anchorElementId.scrollIntoView({ behavior: 'smooth', block: 'start' });
     
        console.log("Rolou para:", anchorElementId);
    })
})

imgs.forEach((img) => {
    img.addEventListener("mouseover", () =>{
        img.src = 'img/des2.png'
    });

    img.addEventListener("mouseout", () => {
        img.src = 'img/des.png'
    });
}) 

aboutImg.addEventListener("mouseover", () => {
setTimeout(() => {
     aboutImg.src  = 'img/rosy1.png';
}, 200);
   
     setTimeout(() => {
    aboutImg.src = 'img/rosy2.png';
  },300);

    setTimeout(() => {
    aboutImg.src = 'img/rosy3.png'
  },400);

});
 aboutImg.addEventListener("mouseout", () =>{
   aboutImg.src = 'img/rosy1.png'
});

// Mostra mensagem de erro ou sucesso ao enviar dados.
function mostrarMes(tipo, texto ) {
  console.log('mostrarMes chamado com:', tipo, texto);
  if(tipo === 'erro' || tipo === 'sucesso') {
    statusMs.innerHTML = texto;
  }else {
    statusMs.innerHTML = '';
  }

}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Valida campos vazios
  if (!nameInp.value.trim() || !emailInp.value.trim() || !mensageInp.value.trim()) {
    mostrarMes('erro', "Por favor, preencha todos os campos!");
   return;
  };
 

 const dados = {
    nome: nameInp.value,
    email: emailInp.value,
    mensagem: mensageInp.value
  };
  

  // Envia os dados para a API/backend local
  
  try {
    const resposta = await fetch('http://localhost:3000/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
      const erroResp = await resposta.json();
      mostrarMes('erro',`Erro: ${erroResp.mensagem}`);
      console.error('Erro no envio:', erroResp);
      return;
    }

    const resultado = await resposta.json();
    mostrarMes('sucesso', resultado.mensagem);

   form.reset();

  } catch (erro) {
    mostrarMes('erro','Erro na requisição: ' + erro.message);
    console.error(erro);
  }

});
