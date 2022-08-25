const FOOTER = `
  <p style="font-size:13px">If you need help, you can contact <a href="mailto:universalmusicpf12@gmail.com">universalmusicpf12@gmail.com</a></p>
  <p style="font-size:13px">Sent by <a href="www.universalmusic-web.app.co">www.universalmusic-web.app.com</a></p>
`;

const LOGO = `
  <img style="width:100px;margin-left:auto;margin-right:auto;display:block;border-radius:100%;margin-bottom:20px" src='https://universalmusic.herokuapp.com/static/images/logoUM.jpg' alt='logo universal music' />
`;


export const AUTHENTICATE_ACCOUNT = (
  name: string,
  last_name: string,
  url: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
  ${LOGO}
  <img
    style="border-radius:10px;width:100%"
    src="https://universalmusic.herokuapp.com/static/images/authenticate.webp"
    alt="Image aunthication"
  />
  <p >
    <span style="display:block;font-weight:bold">Hello, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
    You have registered on our platform and in order to use your account you must authenticate yourself.
    To do this, click on the following link.:
  </p>
  <a
    style="display:block;width:80%;background-color:#4285f5;margin-left:auto;margin-right:auto;border-radius:5px;padding-top:5px;padding-bottom:5px;text-decoration: none;color:white;font-weight:100"
    href="${url}">Click here to authenticate 
  </a>
  ${FOOTER}
</div>`;

export const SUCCESS_ORDER = (
  name: string,
  last_name: string,
  url: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
  ${LOGO}     
  <p >
    <span style="display:block;font-weight:bold">Hello, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
    You have made a purchase, for more information about it click on the following link:
  </p>
  <a
    style="display:block;width:80%;background-color:#4285f5;margin-left:auto;margin-right:auto;border-radius:5px;padding-top:5px;padding-bottom:5px;text-decoration: none;color:white;font-weight:100"
    href="${url}">Click in this link for view order 
  </a>
  ${FOOTER}
</div>`;

export const PROCESS_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
  ${LOGO}     
  <p >
    <span style="display:block;font-weight:bold">Hello, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
    Your items have been sent, in the next few days your order will be arriving, thank you very much for your purchase.
    <br/>
    Receipt #${idOrder}
  </p>
  ${FOOTER}
</div>`;

export const CANCEL_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
  ${LOGO}     
  <p >
    <span style="display:block;font-weight:bold">Hello, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
    There was a problem with your purchase and it has been cancelled, for more information contact the support email.
    <br/>
    Receipt #${idOrder}
  </p>
  ${FOOTER}
</div>`;
export const FINISH_ORDER = (
  name: string,
  last_name: string,
  idOrder: string
) => `
<div style='text-align:center;width:60%;margin-left:auto;margin-right:auto;color:#989898;max-width:766px;font-size:18px'>
  ${LOGO}     
  <p >
    <span style="display:block;font-weight:bold">Hello, ${name?.toUpperCase()} ${last_name?.toUpperCase()}:</span>
    Your purchase was successful and has been delivered, thank you very much for trusting us.
    <br/>
    Receipt #${idOrder}.
  </p>
  ${FOOTER}
</div>`;
