import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/elements/ScrollToTop";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Leads from "./pages/Leads";
import Archives from "./pages/Archives";
import LoginPage from "./pages/LoginPage";
import Account from "./pages/Account";
import Admins from "./pages/Admins";
import EditAdmin from "./pages/EditAdmin";
import AddAdmin from "./pages/AddAdmin";
import CustomerMessages from "./pages/CustomerMessages";
import ProtectedRoute from "./components/elements/ProtectedRoute";
import Locations from "./pages/Locations";
import ProductsStatistics from "./pages/ProductsStatistics";
import LeadDetails from "./pages/LeadDetails";
import TrackedPages from "./pages/TrackedPages";
import TrackedPageLead from "./pages/TrackedPageLead";
import PagesStats from "./pages/PagesStats";
import EmailTemplates from "./pages/EmailTemplates";
import AddTrackedPage from "./pages/AddTrackedPage";
import TrackedPageDetails from "./pages/TrackedPageDetails";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import TestsOnly from "./pages/TestsOnly";
import CreateEmailCampaign from "./pages/CreateEmailCampaign";
import EmailCampaigns from "./pages/EmailCampaigns";
import Audiences from "./pages/Audiences";
import AddAudience from "./pages/AddAudience";
import { AdminProvider } from "./contexts/AdminContext";

function App() {
  const location = useLocation();
  return (
    <AdminProvider>
      <ScrollToTop />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/" component={Home} />
          <Route exact path="/tests" component={TestsOnly} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/products-stats" component={ProductsStatistics} />
          <Route exact path="/pages-stats" component={PagesStats} />
          <Route exact path="/tracked-pages" component={TrackedPages} />
          <Route exact path="/add-trackedpage" component={AddTrackedPage} />
          <Route
            exact
            path="/tracked-pages/:uid"
            component={TrackedPageDetails}
          />
          <Route
            exact
            path="/tracked-pages-user/:uid/:pid/:aid"
            component={TrackedPageLead}
          />
          <Route exact path="/email-templates" component={EmailTemplates} />
          <Route
            exact
            path="/create-campaign"
            component={CreateEmailCampaign}
          />
          <Route exact path="/audience" component={Audiences} />
          <Route exact path="/create-audience" component={AddAudience} />
          <Route exact path="/email-campains" component={EmailCampaigns} />
          <Route exact path="/email-template/:uid" component={EditTemplate} />
          <Route exact path="/add-template" component={AddTemplate} />
          <Route exact path="/leads" component={Leads} />
          <Route exact path="/lead/:uid" component={LeadDetails} />
          <Route exact path="/archives" component={Archives} />
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/customer-messages" component={CustomerMessages} />
          <Route exact path="/admins" component={Admins} />
          <ProtectedRoute exact path="/add-admin" component={AddAdmin} />
          <ProtectedRoute exact path="/edit-admin/:uid" component={EditAdmin} />
          <Route exact path="/account" component={Account} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </AnimatePresence>
    </AdminProvider>
  );
}

export default App;
