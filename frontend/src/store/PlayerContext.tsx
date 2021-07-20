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
    subscribeChannel: (
      channel: string | ActionCable.ChannelNameWithParams,
      mixin: ActionCable.CreateMixin
    ) => (ActionCable.Channel & ActionCable.CreateMixin) | undefined;
  }
>({
  displayName: "",
  authenticated: false,
  loginPlayer: (_displayName) => {},
  logoutPlayer: () => {},
  subscribeChannel: (_channel, _mixin) => undefined,
});

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player>({
    displayName: "",
    authenticated: false,
  });
  const [cable, setCable] = useState<ActionCable.Cable | undefined>(undefined);

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

    cable?.disconnect();
    setCable(undefined);
  };

  const subscribeChannel = (
    channel: string | ActionCable.ChannelNameWithParams,
    mixin: ActionCable.CreateMixin
  ) => {
    if (cable) {
      return cable.subscriptions.create(channel, mixin);
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
