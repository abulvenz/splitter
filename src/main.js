// jshint esversion: 6  
import m from 'mithril';
import tagl from 'tagl-mithril';

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const range = N => {
    let r = [];
    for (let i = 0; i < N; i++) {
        r.push(i);
    }
    return r;
};

const mapArray = (collection, fn = e => e) => {
    const result = [];
    for (let i = 0; i < collection.length; i++) {
        result.push(fn(collection[i]));
    }
    return result;
};

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const contains = (arr, e) => arr.indexOf(e) >= 0;
const use = (v, fn) => fn(v);
const roundTwoDigits = num => Math.round(num * 100) / 100;
const pluck = (arr, prop) => arr.map(e => e[prop]);

const _data = JSON.parse(localStorage.getItem('data')) || {
    users: [],
    expenses: [],
};


console.log(window.location.search)
const updateURL = () => {
    window.location.search = m.buildQueryString({ data: b64EncodeUnicode(JSON.stringify(_data)) })
    return true;
};


const users = () => _data.users;
const expenses = () => _data.expenses;
const sync = () => updateURL() && localStorage.setItem('data', JSON.stringify(_data));

const newUserInput = {
    name: '',
};

const expenseForUser = (expense, user) => - ((expense.user === user ? -expense.amount : 0.0) + (contains(expense.users, user) ? expense.amount / expense.users.length : 0.0));
const spending = (userName, expense) => expenseForUser(expense, userName) || 0.0;
const sum = userName => expenses().map(expense => expenseForUser(expense, userName)).reduce((a, b) => a + b, 0);
const totalSum = () => roundTwoDigits(users().map(user => sum(user.name)).reduce((a, b) => a + b, 0));

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
        users: Object.keys(nextExpense.users).filter(u => nextExpense.users[u])
    });
    Object.assign(nextExpense, {
        title: '',
        amount: 0.0,
        user: '',
        users: {}
    });
    sync();
    show = !show;
};


let queryData = m.parseQueryString(window.location.search);

if (!!queryData['data']) {
    Object.assign(_data,
        JSON.parse(b64DecodeUnicode(queryData.data))
    );
}

const nextExpense = {
    title: '',
    amount: 0.0,
    user: '',
    users: {}
};

const currencies = [
    '$', '€', '¥', '£'
];

let show = true;

const showExpenser = () => show = !show;

m.mount(document.body, {
    view: vnode => [
        [
            div.row(
                m("div", { "class": "col-sm-8" },
                    h1('Splitter',
                        button.small({ onclick: e => (_data.users = [], _data.expenses = []) }, 'clear'),
                        select({ value:_data.currency, oninput: e => (_data.currency = e.target.value, sync()) },
                            currencies.map(c => option(c))
                        ), small(totalSum())),
                ),
                m("div", { "class": "col-sm-4" },
                    input({
                        value: newUserInput.name,
                        oninput: e => (newUserInput.name = e.target.value),
                    }),
                    button({ onclick: e => addUser(newUserInput.name) && (newUserInput.name = '') }, 'Add User')
                ))
        ],
        hr(),
        show ? div.w3AnimateRight([
            table.fullHeight(
                thead(tr(th(), users().map(user => th(user.name)))),
                tbody(
                    expenses().map(
                        expense => tr({ 'data-label': expense.title },
                            td(expense.title, '(', expense.amount, _data.currency, ')'),
                            users()
                                .map(user => user.name)
                                .map(userName => td({ 'data-label': userName }, roundTwoDigits(spending(userName, expense))))
                        )
                    ),
                    tr(td(b('Sum')),
                        users().map(user => use(roundTwoDigits(sum(user.name)), sum => td[{ true: 'positive', false: 'negative' }[sum > 0]](sum, _data.currency)))
                    )
                    //                tr(td({colspan: users().length}, ))
                )
            ),
            button.primary({
                onclick: e => {
                    showExpenser();
                }
            }, '+')])
            : div.w3AnimateLeft([
                label('What?'),
                input({ placeHolder: 'Expense', value: nextExpense.title, oninput: e => nextExpense.title = e.target.value }),
                label('How much?'),
                input({ type: 'number', value: nextExpense.amount, oninput: e => nextExpense.amount = parseFloat(e.target.value) }),
                label('Who payed it?'),
                select({ value: nextExpense.user, oninput: e => nextExpense.user = e.target.value },
                    users().map(user => option(user.name))
                ),
                label('Who enjoyed it?'),
                div.buttonGroup(
                    users().map(user => button[{ true: 'inverse', false: '' }[!!nextExpense.users[user.name]]]({ onclick: e => nextExpense.users[user.name] = !nextExpense.users[user.name] }, user.name))
                ),
                button.secondary({
                    onclick: e => showExpenser()
                }, m.trust('&times;')),
                button.tertiary({
                    onclick: e => {
                        addExpense();
                    }
                }, '+'),

            ]),
        [
/*,*/,

            br()
        ],
        /*textarea({value: JSON.stringify(_data, null, 2), oninput: e => {
          let dat = JSON.parse(e.target.value);
         Object.assign(_data,dat);
        } }),*/
        [
        ]
    ]

});
