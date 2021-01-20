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
                background: #ed1a24;
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
                <div style="width: 100%; padding: 15px; background-color: white; border-radius: 4px;">
                    <div style="padding: 10px 15px;">
                        Hello, <br />${ params.username } sorry, but your registration request has been declined.
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
