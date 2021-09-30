import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CenterContainer from "./components/CenterContainer";
import RestrictedRoute from "./components/RestrictedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Layout";
import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="App">
            <Router>
                <CenterContainer>
                    <Layout>
                        <Switch>
                            <ProtectedRoute exact path="/" component={Notes} />
                            <ProtectedRoute
                                exact
                                path="/create"
                                component={Create}
                            />
                            <RestrictedRoute
                                exact
                                path="/signup"
                                component={Signup}
                            />
                            <RestrictedRoute
                                exact
                                path="/login"
                                component={Login}
                            />
                            <RestrictedRoute
                                exact
                                path="/forgot-password"
                                component={ForgotPassword}
                            />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Layout>
                </CenterContainer>
            </Router>
        </div>
    );
}

export default App;
