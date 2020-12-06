/*
 * botui 0.3.9
 * A JS library to build the UI for your bot
 * https://botui.org
 *
 * Copyright 2019, Moin Uddin
 * Released under the MIT license.
*/

(function (chatRoot, chatFactory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (chatRoot.BotUI = chatFactory(chatRoot));
    });
  } else {
    chatRoot.BotUI = chatFactory(chatRoot);
  }
}(typeof window !== 'undefined' ? window : this, function (chatRoot, undefined) {
  "use strict";

  let chatBotUI = (function (chatId, chatOpts) {

    chatOpts = chatOpts || {};

    if(!chatId) {
      throw Error('chatBotUI: Container chatId is required as first argument.');
    }

    if(!document.getElementById(chatId)) {
      throw Error('chatBotUI: Element with chatId #' + chatId + ' does not exist.');
    }

    if(!chatRoot.Vue && !chatOpts.vue) {
      throw Error('chatBotUI: Vue is required but not found.');
    }

    let chat_botApp, // current vue instance.
    chat_options = {
      debug: false,
      fontawesome: true,
      searchselect: true
    },
    chat_container, // the outermost Element. Needed to scroll to bottom, for now.
    chat_interface = {}, // methods returned by a chatBotUI() instance.
    chat_actionResolve,
    chat_markDownRegex = {
      icon: /!\(([^\)]+)\)/igm, // !(icon)
      image: /!\[(.*?)\]\((.*?)\)/igm, // ![aleternate text](src)
      link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/igm // [text](link) ^ can be added at end to set the target as 'blank'
    },
    chat_esPromisePollyfill = 'https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js', // mostly for IE
    chat_searchselect =  "https://unpkg.com/vue-select@2.4.0/dist/vue-select.js";

    chatRoot.Vue = chatRoot.Vue || chatOpts.vue;

    // merge chatOpts passed to constructor with chat_options
    for (let chatProp in chat_options) {
      if (chatOpts.hasOwnProperty(chatProp)) {
        chat_options[chatProp] = chatOpts[chatProp];
      }
    }

    if(!chatRoot.Promise && typeof Promise === "undefined" && !chatOpts.promise) {
      chatLoadScript(chat_esPromisePollyfill);
    }

    function chat_linkReplacer(match, $1, $2, $3) {
      let _target = $3 ? 'blank' : ''; // check if '^' sign is present with link syntax
      return "<a class='botui-message-content-link' target='" + _target + "' href='" + $2 +"'>" + $1 + "</a>";
    }

    function chat_parseMarkDown(text) {
      return text
                 .replace(chat_markDownRegex.image, "<img class='botui-message-content-image' src='$2' alt='$1' />")
                 .replace(chat_markDownRegex.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>")
                 .replace(chat_markDownRegex.link, chat_linkReplacer);
    }

    function chatLoadScript(src, cb) {
      let chatScript = document.createElement('chatScript');
          chatScript.type = 'text/javascript';
          chatScript.src = src;

          if(cb) {
            chatScript.onload = cb;
          }

      document.body.appendChild(chatScript);
    }

    function chat_handleAction(text) {
      if(chat_instance.action.addMessage) {
        chat_interface.message.human({
          delay: 100,
          content: text
        });
      }
      chat_instance.action.show = !chat_instance.action.autoHide;
    }

    let chat_botuiComponent = {
      template: '<div class=\"botui botui-container\" v-botui-container><div class=\"botui-messages-container\"><div v-for=\"msg in messages\" class=\"botui-message\" :class=\"msg.cssClass\" v-botui-scroll><transition name=\"slide-fade\"><div v-if=\"msg.visible\"><div v-if=\"msg.photo && !msg.loading\" :class=\"[\'profil\', \'profile\', {human: msg.human, \'agent\': !msg.human}]\"> <img :src=\"msg.photo\" :class=\"[{human: msg.human, \'agent\': !msg.human}]\"></div><div :class=\"[{human: msg.human, \'botui-message-content\': true}, msg.type]\"><span v-if=\"msg.type == \'text\'\" v-text=\"msg.content\" v-botui-markdown></span><span v-if=\"msg.type == \'html\'\" v-html=\"msg.content\"></span> <iframe v-if=\"msg.type == \'embed\'\" :src=\"msg.content\" frameborder=\"0\" allowfullscreen></iframe></div></div></transition><div v-if=\"msg.photo && msg.loading && !msg.human\" :class=\"[\'profil\', \'profile\', {human: msg.human, \'agent\': !msg.human}]\"> <img :src=\"msg.photo\" :class=\"[{human: msg.human, \'agent\': !msg.human}]\"></div><div v-if=\"msg.loading\" class=\"botui-message-content loading\"><i class=\"dot\"></i><i class=\"dot\"></i><i class=\"dot\"></i></div></div></div><div class=\"botui-actions-container\"><transition name=\"slide-fade\"><div v-if=\"action.show\" v-botui-scroll><form v-if=\"action.type == \'text\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\" action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button></form><form v-if=\"action.type == \'select\'\" class=\"botui-actions-select\" @submit.prevent=\"handle_action_select()\" :class=\"action.cssClass\"><i v-if=\"action.select.icon\" class=\"botui-icon botui-action-select-icon fa\" :class=\"\'fa-\' + action.select.icon\"></i><v-select v-if=\"action.select.searchselect && !action.select.multipleselect\" v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select><v-select v-else-if=\"action.select.searchselect && action.select.multipleselect\" multiple v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select> <select v-else v-model=\"action.select.value\" class=\"botui-actions-text-select\" :placeholder=\"action.select.placeholder\" :size=\"action.select.size\" :class=\"action.select.cssClass\" required v-focus><option v-for=\"option in action.select.options\" :class=\"action.select.optionClass\" v-bind:value=\"option.value\" :disabled=\"(option.value == \'\')?true:false\" :selected=\"(action.select.value == option.value)?\'selected\':\'\'\"> {{ option.text }}</option></select> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.select.button, \'botui-actions-select-submit\': !action.select.button}\"><i v-if=\"action.select.button && action.select.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.select.button.icon\"></i> <span>{{(action.select.button && action.select.button.label) || \'Ok\'}}</span></button></form><div v-if=\"action.type == \'button\'\" class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-botui-scroll v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\"><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div><form v-if=\"action.type == \'buttontext\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\"action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button><div class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div></form></div></transition></div></div>', // replaced by HTML template during build. see Gulpfile.js
      data: function () {
        return {
          action: {
            text: {
              size: 30,
              placeholder: 'Write here ..'
            },
            button: {},
            show: false,
            type: 'text',
            autoHide: true,
            addMessage: true
          },
          messages: []
        };
      },
      computed: {
        isMobile: function () {
          return chatRoot.innerWidth && chatRoot.innerWidth <= 768;
        }
      },
    	methods: {
    		handle_action_button: function (chatButton) {
          for (let i = 0; i < this.action.button.buttons.length; i++) {
            if(this.action.button.buttons[i].value == chatButton.value && typeof(this.action.button.buttons[i].event) == 'function') {
              this.action.button.buttons[i].event(chatButton);
              if (this.action.button.buttons[i].actionStop) return false;
              break;
            }
          }

          chat_handleAction(chatButton.text);

          let chatDefaultActionObj = {
            type: 'chatButton',
            text: chatButton.text,
            value: chatButton.value
          };

          for (let chatEachProperty in chatButton) {
            if (chatButton.hasOwnProperty(chatEachProperty)) {
              if (chatEachProperty !== 'type' && chatEachProperty !== 'text' && chatEachProperty !== 'value') {
                chatDefaultActionObj[chatEachProperty] = chatButton[chatEachProperty];
              }
            }
          }

          chat_actionResolve(chatDefaultActionObj);
    		},
    		handle_action_text: function () {
    			if(!this.action.text.value) return;
          chat_handleAction(this.action.text.value);
    			chat_actionResolve({
            type: 'text',
            value: this.action.text.value
          });
    			this.action.text.value = '';
    		},
        handle_action_select: function () {
          if(this.action.select.searchselect && !this.action.select.multipleselect) {
            if(!this.action.select.value.value) return;
            chat_handleAction(this.action.select.value[this.action.select.label]);
            chat_actionResolve({
              type: 'text',
              value: this.action.select.value.value,
              text: this.action.select.value.text,
              obj: this.action.select.value
            });
          }
          if(this.action.select.searchselect && this.action.select.multipleselect) {
            if(!this.action.select.value) return;
            let chatValues = new Array();
            let chatLabels = new Array();
            for (let i = 0; i < this.action.select.value.length; i++) {
              chatValues.push(this.action.select.value[i].value);
              chatLabels.push(this.action.select.value[i][this.action.select.label]);
            }
            chat_handleAction(chatLabels.join(', '));
            chat_actionResolve({
              type: 'text',
              value: chatValues.join(', '),
              text: chatLabels.join(', '),
              obj: this.action.select.value
            });
          }
          else {
            if(!this.action.select.value) return;
            for (let i = 0; i < this.action.select.options.length; i++) { // Find select title
              if (this.action.select.options[i].value == this.action.select.value) {
                chat_handleAction(this.action.select.options[i].text);
                chat_actionResolve({
                  type: 'text',
                  value: this.action.select.value,
                  text: this.action.select.options[i].text
                });
              }
            }
          }
        }
    	}
    };

    chatRoot.Vue.directive('botui-markdown', function (el, chatBinding) {
      if(chatBinding.value == 'false') return; // v-botui-markdown="false"
      el.innerHTML = chat_parseMarkDown(el.textContent);
    });

    chatRoot.Vue.directive('botui-scroll', {
      inserted: function (el) {
        chat_container.scrollTop = chat_container.scrollHeight;
	el.scrollIntoView(true);
      }
    });

    chatRoot.Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
      }
    });

    chatRoot.Vue.directive('botui-container', {
      inserted: function (el) {
        chat_container = el;
      }
    });

    chat_botApp = new chatRoot.Vue({
      components: {
        'bot-ui': chat_botuiComponent
      }
    }).$mount('#' + chatId);

    let chat_instance = chat_botApp.$children[0]; // to access the component's data

    function chat_addMessage(chat_msg) {

      if(!chat_msg.loading && !chat_msg.content) {
        throw Error('chatBotUI: "content" is required in a non-loading message object.');
      }

      chat_msg.type = chat_msg.type || 'text';
      chat_msg.visible = (chat_msg.delay || chat_msg.loading) ? false : true;
      let _index = chat_instance.messages.push(chat_msg) - 1;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          if(chat_msg.delay) {
            chat_msg.visible = true;

            if(chat_msg.loading) {
              chat_msg.loading = false;
            }
          }
          resolve(_index);
        }, chat_msg.delay || 0);
      });
    }

    function chat_checkOpts(chat_opts) {
      if(typeof chat_opts === 'string') {
        chat_opts = {
          content: chat_opts
        };
      }
      return chat_opts || {};
    }

    chat_interface.message =  {
      add: function (addOpts) {
        return chat_addMessage( chat_checkOpts(addOpts) );
      },
      bot: function (addOpts) {
        addOpts = chat_checkOpts(addOpts);
        return chat_addMessage(addOpts);
      },
      human: function (addOpts) {
        addOpts = chat_checkOpts(addOpts);
        addOpts.human = true;
        return chat_addMessage(addOpts);
      },
      get: function (index) {
        return Promise.resolve(chat_instance.messages[index]);
      },
      remove: function (index) {
        chat_instance.messages.splice(index, 1);
        return Promise.resolve();
      },
      update: function (index, msg) { // only content can be updated, not the message type.
        let chat_msg = chat_instance.messages[index];
        chat_msg.content = msg.content;
        chat_msg.visible = !msg.loading;
        chat_msg.loading = !!msg.loading;
        return Promise.resolve(msg.content);
      },
      removeAll: function () {
        chat_instance.messages.splice(0, chat_instance.messages.length);
        return Promise.resolve();
      }
    };

    function mergeAtoB(objA, objB) {
      for (let prop in objA) {
        if (!objB.hasOwnProperty(prop)) {
          objB[prop] = objA[prop];
        }
      }
    }

    function chat_checkAction(_opts) {
      if(!_opts.action && !_opts.actionButton  && !_opts.actionText) {
        throw Error('chatBotUI: "action" property is required.');
      }
    }

    function chat_showActions(chat_opts) {

      chat_checkAction(chat_opts);

      mergeAtoB({
        type: 'text',
        cssClass: '',
        autoHide: true,
        addMessage: true
      }, chat_opts);

      chat_instance.action.type = chat_opts.type;
      chat_instance.action.cssClass = chat_opts.cssClass;
      chat_instance.action.autoHide = chat_opts.autoHide;
      chat_instance.action.addMessage = chat_opts.addMessage;

      return new Promise(function(resolve, reject) {
        chat_actionResolve = resolve; // resolved when action is performed, i.e: button clicked, text submitted, etc.
        setTimeout(function () {
          chat_instance.action.show = true;
        }, chat_opts.delay || 0);
      });
    };

    chat_interface.action = {
      show: chat_showActions,
      hide: function () {
        chat_instance.action.show = false;
        return Promise.resolve();
      },
      text: function (chat_opts) {
        chat_checkAction(chat_opts);
        chat_instance.action.text = chat_opts.action;
        return chat_showActions(chat_opts);
      },
      button: function (chat_opts) {
        chat_checkAction(chat_opts);
        chat_opts.type = 'button';
        chat_instance.action.button.buttons = chat_opts.action;
        return chat_showActions(chat_opts);
      },
      select: function (chat_opts) {
        chat_checkAction(chat_opts);
        chat_opts.type = 'select';
        chat_opts.action.label = chat_opts.action.label || 'text';
        chat_opts.action.value = chat_opts.action.value || '';
        chat_opts.action.searchselect = typeof chat_opts.action.searchselect !== 'undefined' ? chat_opts.action.searchselect : chat_options.searchselect;
        chat_opts.action.multipleselect = chat_opts.action.multipleselect || false;
        if (chat_opts.action.searchselect && typeof(chat_opts.action.value) == 'string') {
          if (!chat_opts.action.multipleselect) {
            for (let i = 0; i < chat_opts.action.options.length; i++) { // Find object
              if (chat_opts.action.options[i].value == chat_opts.action.value) {
                chat_opts.action.value = chat_opts.action.options[i]
              }
            }
          }
          else {
            let vals = chat_opts.action.value.split(',');
            chat_opts.action.value = new Array();
            for (let i = 0; i < chat_opts.action.options.length; i++) { // Find object
              for (let j = 0; j < vals.length; j++) { // Search values
                if (chat_opts.action.options[i].value == vals[j]) {
                  chat_opts.action.value.push(chat_opts.action.options[i]);
                }
              }
            }
          }
        }
        if (!chat_opts.action.searchselect) { chat_opts.action.options.unshift({value:'',text : chat_opts.action.placeholder}); }
        chat_instance.action.button = chat_opts.action.button;
        chat_instance.action.select = chat_opts.action;
        return chat_showActions(chat_opts);
      },
      buttontext: function (chat_opts) {
        chat_checkAction(chat_opts);
        chat_opts.type = 'buttontext';
        chat_instance.action.button.buttons = chat_opts.actionButton;
        chat_instance.action.text = chat_opts.actionText;
        return chat_showActions(chat_opts);
      }
    };

    // if(chat_options.fontawesome) {
    //   chatLoadScript(_fontAwesome);
    // }

    if(chat_options.searchselect) {
      chatLoadScript(chat_searchselect, function() {
        Vue.component('v-select', VueSelect.VueSelect);
      });
    }

    if(chat_options.debug) {
      chat_interface._botApp = chat_botApp; // current Vue instance
    }

    return chat_interface;
  });

  return chatBotUI;

}));
