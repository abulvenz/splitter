// jshint esversion: 6
import m from "mithril";
import tagl from "tagl-mithril";
import t from "./translations";

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const range = (N) => {
  let r = [];
  for (let i = 0; i < N; i++) {
    r.push(i);
  }
  return r;
};

const mapArray = (collection, fn = (e) => e) => {
  const result = [];
  for (let i = 0; i < collection.length; i++) {
    result.push(fn(collection[i]));
  }
  return result;
};

const first = (arr = []) => arr[0];
const last = (arr = []) => arr[arr.length - 1];
const pushed = (arr, el) => {
  arr.push(el);
  return arr;
};

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

const contains = (arr, e) => arr.indexOf(e) >= 0;
const use = (v, fn) => fn(v);
const roundTwoDigits = (num) => Math.round(num * 100) / 100;
const pluck = (arr, prop) => arr.map((e) => e[prop]);

const _data = JSON.parse(localStorage.getItem("data")) || {
  users: [],
  expenses: [],
  selectedStrategy: "largest bulk",
};

console.log(window.location.search);
const updateURL = () => {
  window.location.search = m.buildQueryString({
    data: b64EncodeUnicode(JSON.stringify(_data)),
  });
  return true;
};

const users = () => _data.users;
const expenses = () => _data.expenses;
const sync = () =>
  updateURL() && localStorage.setItem("data", JSON.stringify(_data));

const newUserInput = {
  name: "",
};

const expenseForUser = (expense, user) =>
  -(
    (expense.user === user ? -expense.amount : 0.0) +
    (contains(expense.users, user)
      ? expense.amount / expense.users.length
      : 0.0)
  );
const spending = (userName, expense) =>
  expenseForUser(expense, userName) || 0.0;
const sum = (userName) =>
  expenses()
    .map((expense) => expenseForUser(expense, userName))
    .reduce((a, b) => a + b, 0);
const totalSum = () =>
  roundTwoDigits(
    expenses()
      .map((expense) => expense.amount)
      .reduce((a, b) => a + b, 0)
  );

const sumForEachUser = () =>
  users().map((user) => ({ user, sum: sum(user.name) }));

const addUser = (name) => {
  if (users().some((u) => u.name === name)) {
    window.alert(t("User already exists: ") + name);
    return false;
  }
  users().push({
    name,
  });
  sync();
  return true;
};

/**
 * The strategies are defining
 * which user has to pay how much to the other users.
 * The result will be an array
 * [{name: user1, transactions:[{receiver:user2, amount:x}]}
 */
const strategies = [
  {
    name: "simple",
    description: ()=>t("description_simple"),
    calculateTransactions: (expenses, users) => {
      const result = [];
      const startingPoint = sumForEachUser().sort((a, b) => a.sum - b.sum);

      //  result.push(startingPoint);
      startingPoint.forEach((userSum, i) => {
        if (userSum.sum !== 0 && i < startingPoint.length - 1) {
          result.push({
            name: userSum.user.name,
            transactions: [
              {
                receiver: startingPoint[i + 1].user.name,
                amount: userSum.sum,
              },
            ],
          });
          startingPoint[i + 1].sum += userSum.sum;
        }
      });

      return result;
    },
  },  {
    name: "advanced",
    description: ()=>t("description_advanced"),
    calculateTransactions: (expenses, users) => {
      const result = [];
      const startingPoint = sumForEachUser().sort((a, b) => 
        (a.sum<0 && b.sum >0)||(a.sum>0 && b.sum <0)?a.sum-b.sum:b.sum-a.sum    
      );

      //  result.push(startingPoint);
      startingPoint.forEach((userSum, i) => {
        if (userSum.sum !== 0 && i < startingPoint.length - 1) {
          result.push({
            name: userSum.user.name,
            transactions: [
              {
                receiver: startingPoint[i + 1].user.name,
                amount: userSum.sum,
              },
            ],
          });
          startingPoint[i + 1].sum += userSum.sum;
        }
      });

      return result;
    },
  },
  {
    name: "largest bulk",
    description: ()=>t("description_largest_bulk"),
    calculateTransactions: (expenses, users) => {
      const result = [];
      let party = sumForEachUser();

      let balanced = () => party.every((entry) => entry.sum === 0);
      let steps = 0;

      while (!balanced() && steps++ < 10) {
        party.sort((a, b) => a.sum - b.sum);
        const debtor = first(party);
        const debtee = last(party);

        if (party.length === 1) {
          result.push({
            name: debtor.user.name,
            transactions: [],
          });
          break;
        }

        let sofar =
          result.find((user) => user.name === debtor.user.name) ||
          last(
            pushed(result, {
              name: debtor.user.name,
              transactions: [],
            })
          );
        const amount = debtor.sum + debtee.sum > 0 ? debtor.sum : -debtee.sum;
        debtor.sum = debtor.sum - amount;
        debtee.sum = debtee.sum + amount;
        sofar.transactions.push({
          receiver: debtee.user.name,
          amount,
        });
        party = party.filter((entry) => roundTwoDigits(entry.sum) !== 0);
      }
      console.log(result);
      return result;
    },
  },
];

const strategyByName = (name) =>
  strategies.find((s) => s.name === name) || first(strategies);

const addExpense = () => {
  expenses().push({
    title: nextExpense.title.trim(),
    amount: nextExpense.amount,
    user: nextExpense.user,
    users: Object.keys(nextExpense.users).filter((u) => nextExpense.users[u]),
  });
  Object.assign(nextExpense, {
    title: "",
    amount: 0.0,
    user: "",
    users: {},
  });
  sync();
  show = !show;
};

let queryData = m.parseQueryString(window.location.search);

if (!!queryData["data"]) {
  Object.assign(_data, JSON.parse(b64DecodeUnicode(queryData.data)));
}

t.setLanguage(_data.language);

if (!_data.selectedStrategy) _data.selectedStrategy = "largest bulk";

const nextExpense = {
  title: "",
  amount: 0.0,
  user: "",
  users: {},
};

const currencies = ["$", "€", "¥", "£"];

let show = true;

const showExpenser = () => (show = !show);
let result = "";

function selectText(containerid) {
  result = "";
  if (document.selection) {
    // IE
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
  try {
    var ok = document.execCommand("copy");
    if (ok) result = t("Copied!");
    else result = t("Unable to copy!");
  } catch (err) {
    result = t("Unsupported Browser!");
  }
  setTimeout(() => {
    result = "";
    m.redraw();
  }, 2000);
}

const removeExpense = (idx) => {
  _data.expenses.splice(idx, 1);
};

const whenHovered = () => {
  let hovered = false;
  return {
    view: (vnode) => {
      const { a, b } = vnode.attrs;
      return div(
        {
          onmouseenter: (e) => {
            console.log(e);
            hovered = true;
          },
          onmouseleave: (e) => {
            console.log(e);
            hovered = false;
          },
        },
        hovered ? a : b
      );
    },
  };
};

m.mount(document.body, {
  view: (vnode) => [
    div.container([
      [
        div.row(
          m(
            "div",
            { class: "col-md-6 col-sm-12" },
            h1(
              "Splitter",
              button.small(
                { onclick: (e) => ((_data.users = []), (_data.expenses = [])) },
                t("clear")
              ),
              span.small(totalSum()),
              select(
                {
                  value: _data.currency,
                  oninput: (e) => ((_data.currency = e.target.value), sync()),
                },
                currencies.map((c) => option(c))
              ),
              select(
                {
                  value: _data.language,
                  oninput: (e) => {
                    _data.language = e.target.value;
                    t.setLanguage(e.target.value);
                    sync();
                  },
                },
                t.getLanguages().map((c) => option(c))
              )
            )
          ),
          m(
            "div",
            { class: "col-md-6 col-sm-12 mt15" },
            input({
              placeHolder: t("John Doe"),
              value: newUserInput.name,
              oninput: (e) => (newUserInput.name = e.target.value),
            }),
            button(
              {
                onclick: (e) =>
                  addUser(newUserInput.name) && (newUserInput.name = ""),
              },
              span({ class: "icon-user" }),
              t("Add User")
            )
          )
        ),
      ],
      hr(),
      show
        ? div.w3AnimateRight([
            table.fullHeight(
              thead(
                tr(
                  th(),
                  users().map((user) => th(user.name))
                )
              ),
              tbody(
                expenses().map((expense, idx) =>
                  tr(
                    { "data-label": expense.title },
                    td(
                      m(whenHovered, {
                        key: idx,
                        b: [
                          expense.title,
                          "(",
                          expense.amount,
                          _data.currency,
                          ")",
                        ],
                        a: button.small.secondary(
                          {
                            onclick: (e) => removeExpense(idx),
                          },
                          m.trust("&times;")
                        ),
                      })
                    ),
                    users()
                      .map((user) => user.name)
                      .map((userName) =>
                        td(
                          { "data-label": userName },
                          roundTwoDigits(spending(userName, expense))
                        )
                      )
                  )
                ),
                tr(
                  td(b(t("Sum"))),
                  users().map((user) =>
                    use(roundTwoDigits(sum(user.name)), (sum) =>
                      td[{ true: "positive", false: "negative" }[sum > 0]](
                        { "data-label": user.name },
                        sum,
                        _data.currency
                      )
                    )
                  )
                )
                //                tr(td({colspan: users().length}, ))
              )
            ),
            button.primary(
              {
                onclick: (e) => {
                  showExpenser();
                },
              },
              span({ class: "icon-cart" }),
              "+"
            ),
          ])
        : div.w3AnimateLeft([
            label(t("What?")),
            input({
              placeHolder: t("Expense"),
              value: nextExpense.title,
              oninput: (e) => (nextExpense.title = e.target.value),
            }),
            br(),
            label(t("How much?")),
            input({
              type: "number",
              value: nextExpense.amount,
              oninput: (e) => (nextExpense.amount = parseFloat(e.target.value)),
            }),
            _data.currency,
            br(),
            label(t("Who payed it?")),
            select(
              {
                value: nextExpense.user,
                oninput: (e) => (nextExpense.user = e.target.value),
              },
              users().map((user) => option(user.name))
            ),
            br(),
            label(t("Who enjoyed it?")),
            div.buttonGroup(
              button(
                {
                  onclick: (e) =>
                    users()
                      .map((u) => u.name)
                      .forEach((n) => (nextExpense.users[n] = true)),
                },
                "ALL"
              ),
              button(
                {
                  onclick: (e) =>
                    users()
                      .map((u) => u.name)
                      .forEach((n) => (nextExpense.users[n] = false)),
                },
                "NONE"
              )
            ),
            div.buttonGroup(
              users().map((user) =>
                button[
                  { true: "inverse", false: "" }[!!nextExpense.users[user.name]]
                ](
                  {
                    onclick: (e) =>
                      (nextExpense.users[user.name] =
                        !nextExpense.users[user.name]),
                  },
                  user.name
                )
              )
            ),
            // pre(JSON.stringify(nextExpense)),
            button.secondary(
              {
                onclick: (e) => showExpenser(),
              },
              m.trust("&times;")
            ),
            button.tertiary(
              {
                onclick: (e) => {
                  addExpense();
                },
              },
              "+"
            ),
          ]),
    ]),
    hr(),
    h2(t("Split")),
    select(
      {
        value: _data.selectedStrategy,
        oninput: (e) => {_data.selectedStrategy = e.target.value;sync();},
      },
      strategies.map((s) => option({value: s.name},t(s.name)))
    ),
    p(strategyByName(_data.selectedStrategy).description()),
    _data.selectedStrategy
      ? strategyByName(_data.selectedStrategy)
          .calculateTransactions(expenses(), users())
          .map((r) =>
            p(
              r.transactions.map((trans) =>
                div(
                  b(r.name),
                  " ",
                  t("pays"),
                  " ",
                  b(trans.receiver),
                  " ",
                  mark(-roundTwoDigits(trans.amount)),
                  "",
                  _data.currency
                )
              )
            )
          )
      : null,
    hr(),
    div.container(
      div.row(
        div["col-md-2"](
          span({ class: "icon-share" }),
          t("Share the current state by copying this link.")
        ),
        div["col-md-7 col-sm-12"](
          pre.overflowHidden.$linktext(window.location.href),
          t("The link will change with each change you make."),
          result ? div.toast(result) : null
        ),
        div["col-md-3"](
          button(
            {
              onclick: (e) => selectText("linktext"),
            },
            t("Select link")
          )
        )
      )
    ),
  ],
});
