class MoveChannel < ApplicationCable::Channel
  def subscribed
    stream_for player
    match = Match.find(params[:match])
    stream_for match

    broadcast_to player,
                 { event: 'moves', match: match.details, moves: match.moves.order(:number).map(&:cell),
                   result: match.result }
  end
end
