export default (params) => {
  return `
    <!DOCTYPE html>
    <html lang="en" >
    <head >
        <meta charset="UTF-8" >
        <style type="text/css">
            .button {
                cursor: pointer;
                outline: none;
                padding: 12px;
                border: none;
                color: white;
                font-size: 14px;
                border-radius: 4px;
                text-transform: uppercase;
                text-decoration: none;
                display: inline-block;
                font-weight: bold;
            }
    
            .button:hover {
                background: #c3171f;
            }
        </style>
    </head >
    <body style="width: 100%;margin: 0;padding: 0; background-color:#f1f1f1;">
        <div style="width: 100%;font-family: Arial, Helvetica, sans-serif;font-size: 15px;line-height: 20px;">
            <div style="display: flex; flex-direction:column;align-items: center;">
                <div style="text-align:center; width: 100%" >
                    <img class="size-medium wp-image-10116 aligncenter" 
                        src="https://manage.traceomat.info/static/media/logo.3eb8e1f2.png"
                        alt="vitim"
                        width="250"
                        height="250"
                        style="margin: 0 auto" />
                </div>
                <div style="max-width: 768px; min-width: 300px; padding: 15px; background-color: white; border-radius: 4px;">
                    <div style="padding: 10px 15px;">
                        Hello, <br />${ params.username }(${ params.email }) has requested you to registration on the site ${ params.site }.
                        The registration request will expire in {{ time }}. Please accept or decline this request.
                    </div>
                    <div style="padding: 10px 55px; text-align:center;">
                        <a class="button" href='${ params.declineUrl }' target='_blank'
                           style="background:#ed1a24;border-radius:3px;color:white;display:inline-block;font-family:'avenir next' , 'avenir' , sans-serif;font-size:14px;font-weight:500;line-height:120%;margin:0;padding:10px 25px 10px 25px;"
                        >
                            <span style="color: white!important;">
                                Decline
                            </span>
                        </a >
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <a class="button"
                                  style="background: #28a745!important;border-radius:3px;color:white;display:inline-block;font-family:'avenir next' , 'avenir' , sans-serif;font-size:14px;font-weight:500;line-height:120%;margin:0;padding:10px 25px 10px 25px;"
                           href='{{ params.acceptUrl }}' target='_blank'
                        >
                            <span style="color: white!important; font-weight: bold;">
                                Accept
                            </span>
                        </a >
                    </div>
                    <div style="padding: 10px 15px;">
                        If you are having any issues with your account, please don't hesitate to contact us by this email <a href="mailto:${ params.support }">${ params.support }</a>.
                    </div>
                    <div style="padding: 0 15px;">
                        Thanks!
                    </div>
                </div>
            </div>
        </div>
    </body >
    </html >
    `;
}
