class PlayerChannel < ApplicationCable::Channel
  def subscribed # rubocop:disable Metrics/AbcSize
    player.online = true
    player.save
    stream_for player
    stream_from channel_name

    broadcast_to player, { event: 'list', players: Player.online.map(&:name) }
    ActionCable.server.broadcast channel_name, { event: 'join', player: player.name }
  end

  def unsubscribed
    player.online = false
    player.save
    ActionCable.server.broadcast channel_name, { event: 'part', player: player.name }
  end

  private

  def channel_name
    'available_players'
  end
end
