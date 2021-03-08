import "./style";
import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import template from "./template";
import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import TextField from "preact-material-components/TextField";
import "preact-material-components/TextField/style.css";
import TabBar from "preact-material-components/TabBar";
import "preact-material-components/TabBar/style.css";
import "preact-material-components/Tabs/style.css";
import "preact-material-components/Tab/style.css";
import "preact-material-components/TabIndicator/style.css";
import "preact-material-components/TabScroller/style.css";
import Typography from "preact-material-components/Typography";
import "preact-material-components/Typography/style.css";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";

const getOrElse = (url, key, defaultValue) =>
  url?.searchParams.has(key) ? url.searchParams.get(key) : defaultValue;

let url = typeof window !== "undefined" ? new URL(window.location.href) : null;

const initialState = {
  html: getOrElse(url, "html", "<h1>Hello Prolog</h1>"),
  css: getOrElse(url, "css", "h1 { color: red; }"),
  prolog: getOrElse(url, "prolog", "main."),
  query: getOrElse(url, "query`", "main."),
  limit: getOrElse(url, "limit", 1000),
  play: false,
};

const State = createContext();

const Editor = (props) => {
  const { state, setState } = useContext(State);
  const handleInput = (event) => {
    setState({ ...state, play: false, [props.lang]: event.target.value });
  };
  return (
    <TextField
      class="editor"
      label={props.lang}
      textarea
      value={state[props.lang]}
      onInput={handleInput}
    />
  );
};

const Misc = () => {
  const { state, setState } = useContext(State);
  const params = Object.entries(state)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const {protocol, host, pathname} = window.location
  const url = `${protocol}//${host}${pathname}?${params}`
  const iframe = `<div style="position:relative;padding-top:75%;height:0;"><iframe style="border: solid 1px #ccc;width:100%;height:100%;position:absolute;top:0;left:0;" width="400" height="300" src="${url}"></iframe></div>`;
  const handleInput = (key) => (event) => {
    setState({ ...state, play: false, [key]: event.target.value });
  };
  return (
    <div class="misc">
      <Card>
        <div class="headline">
          <Typography headline6>Settings</Typography>
        </div>
        <label htmlFor="query">Query</label>
        <TextField
          id="query"
          type="text"
          value={state.query}
          onInput={handleInput("query")}
          fullwidth
        />
        <br />
        <label htmlFor="query">Limit</label>
        <TextField
          id="limit"
          type="number"
          value={state.limit}
          onInput={handleInput("limit")}
          fullwidth
        />
      </Card>
      <Card>
        <div class="headline">
          <Typography headline6>Share</Typography>
        </div>
        <label htmlFor="url">URL</label>
        <TextField id="url" type="url" value={url} readonly fullwidth />
        <br />
        <label htmlFor="iframe">IFrame</label>
        <TextField id="iframe" type="text" value={iframe} readonly fullwidth />
      </Card>
      <Card>
        <div>
          <Typography headline6>About Prolog Player</Typography>
        </div>
        <Typography body1>
          <p>
            The author is TANIGUCHI Masaya. He have published this software sice
            Mar. 2021. The code is licensed under the MIT license. You can see
            the code at
            <a href="https://github.com/tani/prolog-player" target="_blank">
              GitHub
            </a>
            . Please visit here if you have some idea or contributions.
          </p>
          <p>
            This software based on Vue, Primevue, and Tau Prolog. Thank you for
            great softwares!
          </p>
        </Typography>
        <div>
          <Typography headline6>Terms of Use</Typography>
        </div>
        <Typography body1>
          <p>
            You must comply with the MIT license when distributing or running
            applications through this software. The term distribute includes the
            following cases:
            <ul>
              <li>Embed in some way on other websites</li>
              <li>Direct to the app via a hyperlink</li>
            </ul>
            In particular, the author assumes no responsibility for any
            application using this software.
          </p>
        </Typography>
        <div>
          <Typography headline6>License</Typography>
        </div>
        <Typography body1>
          <p>Copyright 2021 TANIGUCHI Masaya</p>
          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.{" "}
          </p>
        </Typography>
      </Card>
    </div>
  );
};

const Play = () => {
  const { state, setState } = useContext(State);
  const handleClick = () => {
    setState({ ...state, play: true });
  };
  return (
    <div class="play">
      {state.play ? (
        <iframe srcDoc={template(state)} />
      ) : (
        <Button outlined onClick={handleClick}>
          Play
        </Button>
      )}
    </div>
  );
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [tab, setTab] = useState("play");
  const TabBody = {
    play: <Play />,
    html: <Editor lang="html" />,
    css: <Editor lang="css" />,
    prolog: <Editor lang="prolog" />,
    misc: <Misc />,
  };
  return (
    <State.Provider value={{ state, setState }}>
      <div id="root">
        <div class="tagbar">
          <TabBar>
            {Object.keys(TabBody).map((key) => (
              <TabBar.Tab active={tab === key} onClick={() => setTab(key)}>
                <TabBar.TabLabel>{key}</TabBar.TabLabel>
              </TabBar.Tab>
            ))}
          </TabBar>
        </div>
        <div class="tabbody">{TabBody[tab]}</div>
      </div>
    </State.Provider>
  );
}
