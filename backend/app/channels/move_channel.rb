class MoveChannel < ApplicationCable::Channel
  def subscribed
    stream_for player
    match = Match.find(params[:match])
    stream_for match

    broadcast_to player, { event: 'moves', match: match.id, moves: moves.order(:number).map(&:cell) }
  end
end
