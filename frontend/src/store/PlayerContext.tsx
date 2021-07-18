import { createContext, useState } from "react";
import ActionCable from "actioncable";

type Player = {
  displayName: string;
  authenticated: boolean;
};

const PlayerContext = createContext<
  Player & {
    loginPlayer: (displayName: string) => void;
    logoutPlayer: () => void;
    subscribeChannel: (channel: string, mixin: ActionCable.CreateMixin) => void;
  }
>({
  displayName: "",
  authenticated: false,
  loginPlayer: (_displayName) => {},
  logoutPlayer: () => {},
  subscribeChannel: (_channel, mixin) => {},
});

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player>({
    displayName: "",
    authenticated: false,
  });
  const [cable, setCable] = useState<ActionCable.Cable | undefined>(undefined);
  const [subscriptions, setSubscriptions] = useState<
    (ActionCable.Channel & ActionCable.CreateMixin)[]
  >([]);

  const loginPlayer = (displayName: string) => {
    setPlayer({
      displayName,
      authenticated: true,
    });

    setCable(ActionCable.createConsumer(process.env.REACT_APP_CABLE_URL!));
  };

  const logoutPlayer = () => {
    setPlayer({
      displayName: "",
      authenticated: false,
    });

    subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    setSubscriptions([]);

    cable?.disconnect();
    setCable(undefined);
  };

  const subscribeChannel = (
    channel: string,
    mixin: ActionCable.CreateMixin
  ) => {
    if (cable) {
      const subscription = cable.subscriptions.create(channel, mixin); // TODO: prevent duplicate subscriptions
      setSubscriptions((prevSubscriptions) => {
        return prevSubscriptions.concat(subscription);
      });
    }
  };

  const context = {
    loginPlayer,
    logoutPlayer,
    subscribeChannel,
    ...player,
  };

  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContext;
