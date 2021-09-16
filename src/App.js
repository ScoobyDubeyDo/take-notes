import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Create from "./pages/Create";
import Notes from "./pages/Notes";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Notes />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
