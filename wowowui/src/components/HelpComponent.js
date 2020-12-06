import React, {Component} from 'react';
import '../chatbot/css/style.css'
import '../chatbot/css/botui-theme-default.css'
import '../chatbot/css/botui.min.css'
import '../chatbot/font/iconfont.css'

const vueScript = document.createElement('script');
vueScript.type = 'text/javascript';
vueScript.async = true;
vueScript.src = 'https://cdn.jsdelivr.net/npm/vue';
document.body.appendChild(vueScript);

const botuiScript = document.createElement('script');
botuiScript.type = 'text/javascript';
botuiScript.async = true;
botuiScript.src = 'https://unpkg.com/botui/build/botui.min.js';
document.body.appendChild(botuiScript);

class Help extends Component{

    constructor(props){
        super(props);
        if(window.location.href.indexOf("#")===-1){
            window.location.href=window.location.href+"#";
            window.location.reload();
        }
    }

    render(){
        return(
            <div id="botui-box">
                <div className="botui-app-top">
                    <div id="botui-ellipsis" className="botui-btn">
                        <span className="iconfont icon-ellipsis"></span>
                    </div>
                    <div id="botui-close" className="botui-btn">
                        <span className="iconfont icon-close"></span>
                    </div>
                    <div id="botui-reload" className="botui-btn">
                        <span className="iconfont icon-reload"></span>
                    </div>
                </div>
                <div className="botui-app-container" id="botui-app">
                    <bot-ui></bot-ui>
                </div>
            </div>
        );
    }
}

export default Help;
