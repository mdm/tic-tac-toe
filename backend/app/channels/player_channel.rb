class PlayerChannel < ApplicationCable::Channel
  @@players = Set.new # This works, but I don't consider it production grade code

  def subscribed
    stream_for player
    stream_from channel_name
    @@players.add player.name

    broadcast_to player, { event: 'list', players: @@players.to_a }
    ActionCable.server.broadcast channel_name, { event: 'join', player: player.name }
  end

  def unsubscribed
    @@players.delete player.name
    ActionCable.server.broadcast channel_name, { event: 'part', player: player.name }
  end

  private

  def channel_name
    'available_players'
  end
end
