// jshint esversion: 6  


import m from 'mithril';
import tagl from 'tagl-mithril';


// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const _data = JSON.parse(localStorage.getItem('data')) || {
    users: [],
};

const sync = () => localStorage.setItem('data', JSON.stringify(_data));

const addUser = name => {
    _data.users.push({
        name,
        spendings: [],
    });
    sync();
    return true;
};

const newUserInput = {
    name: '',
};

const _vdata = {};

const byName = userName => _data.users.find(user => user.name === userName);

const range = N => {
    let r = [];
    for(let i = 0; i < N; i++) {
        r.push(i);
    }
    return r;
};

const maxSpent = () => _data.users.map(user => user.spendings.length).reduce((a,b)=>Math.max(a,b),0);

const spending = (userName, idx) => byName(userName).spendings[idx] || 0.0;

const sum = userName => byName(userName).spendings.reduce((a,b)=>a+b,0);

const totalSum=() =>roundTwoDigits( _data.users.map(user=>sum(user.name)).reduce((a,b)=>a+b,0));

const roundTwoDigits = num => Math.round(num*100) / 100;

const pay = userName => sum(userName) - totalSum() / (_data.users.length || 1);

const use = (v,fn)=>fn(v);

m.mount(document.body, {
    view: vnode => [
        h1('Splitter' ,              button.small({onclick:e=>{
            _data.users=[];
        }},'clear'),
        small(
            totalSum()
        )),
        hr(),
        input({
            value: newUserInput.name,
            oninput: e => (newUserInput.name = e.target.value),
        }),
        button({onclick: e => addUser(newUserInput.name) && (newUserInput.name = '')}, 'Add User'),
        table.fullHeight(
            thead(tr(_data.users.map(user => th(user.name)))),
            tbody(
                range(maxSpent()).map(
                    idx=>tr(
                        _data.users
                        .map(user=>user.name)
                        .map(userName=>td( roundTwoDigits( spending(userName,idx))))
                    )
                ),
                tr(),
                tr(
                    _data.users.map(user=>roundTwoDigits(sum(user.name))).map(sum=>td.total(sum))
                ),
                tr(
                    _data.users.map(user=>use(roundTwoDigits(pay(user.name)), pay => 
                    td[{true:'positive',false:'negative'}[pay > 0]](pay)))
                
                ),
                tr(
                    _data.users.map(user =>
                        td(
                            input({
                                type: 'number',
                                value: _vdata[user.name],
                                oninput: e => (_vdata[user.name] = parseFloat(e.target.value)),
                            }),
                            button(
                                {
                                    onclick: e => {
                                        if (_vdata[user.name] !== 0.0) {
                                            byName(user.name).spendings.push(_vdata[user.name]);
                                            _vdata[user.name] = 0.0;
                                            sync();
                                        }
                                    },
                                },
                                '+'
                            )
                        )
                    )
                )
            )
        ),
        textarea({value: JSON.stringify(_data.users,null,2),oninput: e => {
          let dat = JSON.parse(e.target.value);
          _data.users = dat;
        } })
    ]
    
});
