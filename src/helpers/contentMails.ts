export const AUTHENTICATE_ACCOUNT = (
  name: string,
  last_name: string,
  idUser: string,
  code: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
    <img style="width:100px;margin-left:auto;margin-right:auto;display:block;border-radius:100%;margin-bottom:20px" src='https://raw.githubusercontent.com/cirorey20/client-pf-ecommerce/dev/src/assets/logoUM.jpg' alt='logo universal music' />
      <img
      style="border-radius:10px;width:100%"
        src="https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature-630x330.jpg"
        alt="Image aunthication">
      <p >
        <span style="display:block;font-weight:bold">Hola, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
        Te has registrado en nuestra plataforma y para poder hacer uso de tu cuenta debes realizar una autenticación,
        para ello por favor haz click en el siguiente enlace:
      </p>
      <a
          style="display:block;width:80%;background-color:#4285f5;margin-left:auto;margin-right:auto;border-radius:5px;padding-top:5px;padding-bottom:5px;text-decoration: none;color:white;font-weight:100"
          href="http://localhost:3000/account/authenticate/${idUser}/${code}">Presiona para
          autenticar </a>
          <p style="font-size:13px">En caso de necesitar ayuda puedes comunicarte a <a href="mailto:universalmusic@gmail.com">universalmusic@gmail.com</a></p>
          <p style="font-size:13px">Enviado por <a href="www.universalmusic-web.app.co">www.universalmusic-web.app.com</a></p>
    </div>`;

export const UPDATE_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
    <img style="width:100px;margin-left:auto;margin-right:auto;display:block;border-radius:100%;margin-bottom:20px" src='https://raw.githubusercontent.com/cirorey20/client-pf-ecommerce/dev/src/assets/logoUM.jpg' alt='logo universal music' />
     
      <p >
        <span style="display:block;font-weight:bold">Hola, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
     Tu compra ha sido enviada , en los proximos dias te estara llegando tu pedido , muchas gracias por tu compra.
     <br/>
          El codigo de recibo de tu orden es ${idOrder}
      </p>
      
          <p style="font-size:13px">En caso de necesitar ayuda puedes comunicarte a <a href="mailto:universalmusic@gmail.com">universalmusic@gmail.com</a></p>
          <p style="font-size:13px">Enviado por <a href="www.universalmusic-web.app.co">www.universalmusic-web.app.com</a></p>
    </div>`;
export const CANCEL_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
    <img style="width:100px;margin-left:auto;margin-right:auto;display:block;border-radius:100%;margin-bottom:20px" src='https://raw.githubusercontent.com/cirorey20/client-pf-ecommerce/dev/src/assets/logoUM.jpg' alt='logo universal music' />
     
      <p >
        <span style="display:block;font-weight:bold">Hola, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
     Hubo un problema con tu compra y ha sido cancelada por favor comunicarte a el correo que aparece en pantalla.
          <br/>
     El codigo de recibo de tu orden es ${idOrder}
      </p>
          <p style="font-size:13px">En caso de necesitar ayuda puedes comunicarte a <a href="mailto:universalmusic@gmail.com">universalmusic@gmail.com</a></p>
          <p style="font-size:13px">Enviado por <a href="www.universalmusic-web.app.co">www.universalmusic-web.app.com</a></p>
    </div>`;
export const FINISH_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
    <img style="width:100px;margin-left:auto;margin-right:auto;display:block;border-radius:100%;margin-bottom:20px" src='https://raw.githubusercontent.com/cirorey20/client-pf-ecommerce/dev/src/assets/logoUM.jpg' alt='logo universal music' />
     
      <p >
        <span style="display:block;font-weight:bold">Hola, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
     Tu compra ha sido finalizada y entregada , muchas gracias por confiar en nosotros.
          <br/>
          El codigo de recibo de tu orden es ${idOrder}.
      </p>
      
          <p style="font-size:13px">En caso de necesitar ayuda puedes comunicarte a <a href="mailto:universalmusic@gmail.com">universalmusic@gmail.com</a></p>
          <p style="font-size:13px">Enviado por <a href="www.universalmusic-web.app.co">www.universalmusic-web.app.com</a></p>
    </div>`;
