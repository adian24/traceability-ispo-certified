import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurant from "../Restaurant";
import Dashboard from "../Dashboard";
import RouteMap from "../RouteMap";
import Welcome from "../Welcome";
import Hotel from "../Hotel";
import DetailPlace from "../DetailPlace";
import Company from "../Company";
import CompanyMobile from "../Mobile/CompanyMobile";
import HotelMobile from "../Mobile/HotelMobile";
import RestaurantMobile from "../Mobile/RestaurantMobile";
import DetailPlaceMobile  from "../Mobile/DetailPlaceMobile";
import ListCompanyMobile  from "../Mobile/ListCompanyMobile";
import Login from "../Login";
import LoginMobile from "../Mobile/LoginMobile";
import Register from "../Register";
import RegisterMobile from "../Mobile/RegisterMobile";
import Finish from "../Payment/finish";
import Failure from "../Payment/failure";
import UnFinish from "../Payment/unfinish";
import ManualFinish from "../Payment/manualFinish";
import ManualFailure from "../Payment/manualFailure";
import ManualUnFinish from "../Payment/manualUnfinish";
import SPBU from "../SPBU";

const MainApp = () => {
  return (
    <Router>
      <Switch>
        {/* mobile version */}
        <Route path={"/m/register"}>
          <RegisterMobile/>
        </Route>
        <Route path={"/m/login"}>
          <LoginMobile/>
        </Route>
        <Route path={"/m/detail_place/:map_id"}>
          <DetailPlaceMobile/>
        </Route>
        <Route path={"/m/company/list"}>
          <ListCompanyMobile/>
        </Route>
        <Route path={"/m/restaurant"}>
          <RestaurantMobile/>
        </Route>
        <Route path={"/m/hotel"}>
          <HotelMobile/>
        </Route>
        <Route path={"/m/company"}>
          <CompanyMobile/>
        </Route>

        {/* web version */}
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/failure" component={Failure} exact />
        <Route path="/payment/unfinish" component={UnFinish} exact />

        <Route path="/payment/manualFinish" component={ManualFinish} exact />
        <Route path="/payment/manualFailure" component={ManualFailure} exact />
        <Route path="/payment/manualUnfinish" component={ManualUnFinish} exact />

        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/detail_Place/:map_id">
          <DetailPlace />
        </Route>
        <Route path="/spbu">
          <SPBU />
        </Route>
        <Route path="/hotel">
          <Hotel />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/restaurant">
          <Restaurant />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/route_map">
          <RouteMap />
        </Route>
        <Route path="/" exact>
          <Welcome />
        </Route>

      </Switch>
    </Router>
  );
};

export default MainApp;
