// jshint esversion: 6  
import m from 'mithril';
import tagl from 'tagl-mithril';

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const range = N => {
    let r = [];
    for(let i = 0; i < N; i++) {
        r.push(i);
    }
    return r;
};

const mapArray = (collection, fn = e=>e) => {
    const result =  [];
    for (let i = 0; i < collection.length; i++) {
        result.push(fn(collection[i]));
    }
    return result;
};

const contains = (arr, e) => arr.indexOf(e) >= 0;
const use = (v,fn) => fn(v);
const roundTwoDigits = num => Math.round(num*100) / 100;
const pluck = (arr,prop) => arr.map(e => e[prop]);

const _data = JSON.parse(localStorage.getItem('data')) || {
    users: [],
    expenses: [],
};
const users = () => _data.users;
const expenses = () => _data.expenses;
const sync = () => localStorage.setItem('data', JSON.stringify(_data));

const newUserInput = {
    name: '',
};

const expenseForUser = (expense,user) =>- ((expense.user === user? -expense.amount :0.0) + (contains(expense.users,user)? expense.amount/expense.users.length :0.0));
const spending = (userName, expense) => expenseForUser(expense,userName) || 0.0;
const sum = userName => expenses().map(expense=>expenseForUser(expense,userName)).reduce((a,b)=>a+b,0);
const totalSum=() =>roundTwoDigits( users().map(user=>sum(user.name)).reduce((a,b)=>a+b,0));

const addUser = name => {
    users().push({
        name
    });
    sync();
    return true;
};

const addExpense = () => {
    expenses().push({
        title: nextExpense.title,
        amount: nextExpense.amount,
        user: nextExpense.user,
        users: Object.keys(nextExpense.users).filter(u=>nextExpense.users[u])
    });
    Object.assign(nextExpense,{
        title: '',
        amount: 0.0,
        user: '',
        users: {}
    });
    sync();
};

const nextExpense = {
    title: '',
    amount: 0.0,
    user: '',
    users: {}
};

const currencies = [
    '$','€','¥','£'
];

m.mount(document.body, {
    view: vnode => [
        h1('Splitter' ,              
            button.small({onclick:e=> (_data.users = [], _data.expenses = [])},'clear'),
            select({oninput: e=>(_data.currency=e.target.value, sync())},
            currencies.map(c=>option(c))
        ),small(totalSum())),
        
        hr(),
        input({
            value: newUserInput.name,
            oninput: e => (newUserInput.name = e.target.value),
        }),
        button({onclick: e => addUser(newUserInput.name) && (newUserInput.name = '')}, 'Add User'),
        table.fullHeight(
            thead(tr(th(),users().map(user => th(user.name)))),
            tbody(
                expenses().map(
                    expense => tr({'data-label':expense.title},
                    td(expense.title,'(',expense.amount,_data.currency,')'),   
                    users()
                        .map(user => user.name)
                        .map(userName => td({'data-label':userName}, roundTwoDigits( spending(userName,expense))))
                    )
                ),
                tr(td(b('Sum')),
                    users().map(user => use( roundTwoDigits(sum(user.name)),sum=>td[{true:'positive',false:'negative'}[sum > 0]](sum,_data.currency)))
                )
//                tr(td({colspan: users().length}, ))
            )
        ),
        [
            input({placeHolder:'Expense', value: nextExpense.title, oninput: e=>nextExpense.title=e.target.value}),
            input({type:'number', value: nextExpense.amount, oninput: e=>nextExpense.amount=parseFloat(e.target.value)}),
            select({value: nextExpense.user,oninput:e => nextExpense.user = e.target.value},
                users().map(user=>option(user.name))
            ),
            div.buttonGroup(
                users().map(user=>button[{true:'inverse', false:''}[!!nextExpense.users[user.name]]]({onclick:e=>nextExpense.users[user.name]=!nextExpense.users[user.name]},user.name))
            ),
            button.tertiary({
                onclick:e=>{
                    addExpense();
                }
            }, '+'),
            br()
        ],
        textarea({value: JSON.stringify(_data, null, 2), oninput: e => {
          let dat = JSON.parse(e.target.value);
         Object.assign(_data,dat);
        } })
    ]
    
});
