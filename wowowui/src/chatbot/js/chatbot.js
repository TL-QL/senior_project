let botui = new BotUI('botui-app'); // give it the id of container

window.onload = function () {
    init();
}

let init = function () {
    botui.message.bot({ // show first message
        loading: true,
        delay: 500,
        content: 'Hello, are you a buyer or a seller?'
    }).then(function () {
        return botui.action.button({ // let user do something
            delay: 500,
            action: [
                {
                    text: 'I am a buyer',
                    value: 'A1'
                },
                {
                    text: 'I am a seller',
                    value: 'A2'
                }
            ]
        });
    }).then(function (res) {
        switch (res.value) {
            case 'A1':
                A1();
                break;
            case 'A2':
                A2();
                break;
        }
    });
}

let A1 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "What's your problem?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Account Problem',
                    value: 'A1B1'
                },
                {
                    text: 'Favorite List Issue',
                    value: 'A1B2'
                },
                {
                    text: 'Shopping Cart Issue',
                    value: 'A1B3'
                },
                {
                    text: 'No Response From Calling the Customer Service',
                    value: 'A1B4'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "A1B1":
                A1B1();
                break;
            case "A1B2":
                A1B2();
                break;
            case "A1B3":
                A1B3();
                break;
            case "A1B4":
                A1B4();
                break;
        }
    })
}

let A2 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "What's your problem?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Account Problem',
                    value: 'A2B1'
                },
                {
                    text: 'Post Goods Problem',
                    value: 'A2B2'
                },
                {
                    text: 'No Response From Calling the Customer Service',
                    value: 'A2B3'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "A2B1":
                A2B1();
                break;
            case "A2B2":
                A2B2();
                break;
            case "A2B3":
                A2B3();
                break;
        }
    })
}

let A1B1 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "What is the issue with your account?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Webpage Access Issue',
                    value: 'A1B1C1'
                },
                {
                    text: 'Login Failure',
                    value: 'A1B1C2'
                },
                {
                    text: 'Sign Up Failure',
                    value: 'A1B1C3'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "A1B1C1":
                A1B1C1();
                break;
            case "A1B1C2":
                A1B1C2();
                break;
            case "A1B1C3":
                A1B1C3();
                break;
        }
    })
}

let A1B2 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Did you sign up as a buyer?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Yes',
                    value: 'yes'
                },
                {
                    text: 'No',
                    value: 'no'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "yes":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Please call the customer service number listed on the bottom of our website to solve this problem."
                }).then(function () {
                    endReply(false);
                })
                break;
            case "no":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Only registered buyers are able to add items to their favorite list. Please use your school email to sign up again as a buyer."
                }).then(function () {
                    endReply(true);
                })
                break;
        }
    })
}

let A1B3 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Did you sign up as a buyer?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Yes',
                    value: 'yes'
                },
                {
                    text: 'No',
                    value: 'no'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "yes":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Please call the customer service number listed on the bottom of our website to solve this problem."
                }).then(function () {
                    endReply(false);
                })
                break;
            case "no":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Only registered buyers are able to add items to their favorite list. Please use your school email to sign up again as a buyer."
                }).then(function () {
                    endReply(true);
                })
                break;
        }
    })
}

let A1B4 = function () {
    noResponse();
}

let A2B1 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "What is the issue with your account?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'No Access to Pages other Than Home Page',
                    value: 'A2B1C1'
                },
                {
                    text: 'Login Failure',
                    value: 'A1B1C2'
                },
                {
                    text: 'Sign Up Failure',
                    value: 'A1B1C3'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "A2B1C1":
                A2B1C1();
                break;
            case "A1B1C2":
                A1B1C2();
                break;
            case "A1B1C3":
                A1B1C3();
                break;
        }
    })
}

let A2B2 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Did you sign up as a seller?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Yes',
                    value: 'yes'
                },
                {
                    text: 'No',
                    value: 'no'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "yes":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Please call the customer service number listed on the bottom of our website to solve this problem."
                }).then(function () {
                    endReply(false);
                })
                break;
            case "no":
                botui.message.bot({
                    loading: true,
                    delay: 500,
                    content: "Only registered buyers are able to add items to their favorite list. Please use your school email to sign up again as a buyer."
                }).then(function () {
                    endReply(true);
                })
                break;
        }
    })
}

let A2B3 = function () {
    noResponse();
}

let A1B1C1 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Please create an account by using the school email address. Only users who have login can access all pages."
    }).then(function () {
        endReply(true);
    })
}

let A1B1C2 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Please check if they are using the correct school email address or give the sellers the link to change the password."
    }).then(function () {
        endReply(true);
    })
}

let A1B1C3 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Please check if they are using the school email address."
    }).then(function () {
        endReply(true);
    })
}

let A2B1C1 = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Please create an account by using the school email address since only sellers who have logged in can access all pages."
    }).then(function () {
        endReply(true);
    })
}

let noResponse = function () {
    botui.message.bot({
        loading: true,
        delay: 500,
        content: "Sorry for the inconvenience. Please either send a message through Skype or e-mail. The customer service will respond as soon as possible."
    }).then(function () {
        endReply(false);
    })
}

let endReply = function (flag) {
    botui.message.bot({
        delay: 500,
        content: flag ? "If you have further questions, you can call the customer service number listed on the bottom of our website. Do you have more problems?" : "Do you have more problems?"
    }).then(function () {
        return botui.action.button({
            loading: true,
            delay: 500,
            action: [
                {
                    text: 'Yes',
                    value: 'yes'
                },
                {
                    text: 'No',
                    value: 'no'
                }
            ]
        })
    }).then(function (res) {
        switch (res.value) {
            case "yes":
                init();
                break;
            case "no":
                botui.message.bot({
                    delay: 500,
                    content: "Have a great day."
                })
                break;
        }
    })
}

let reload = document.getElementById('botui-reload');

reload.onclick = function () {
    botui.message.removeAll();
    botui.action.hide();
    init();
}

let close = document.getElementById('botui-close');

close.onclick = function () {
    document.getElementById('botui-box').style.display = 'none';
}