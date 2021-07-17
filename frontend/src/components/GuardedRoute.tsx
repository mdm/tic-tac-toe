import { Redirect, Route, RouteProps } from "react-router";

type GuardedRouteProps = {
  authenticated: boolean;
};

const GuardedRoute: React.FC<GuardedRouteProps & RouteProps> = ({
  authenticated,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        return authenticated ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default GuardedRoute;
