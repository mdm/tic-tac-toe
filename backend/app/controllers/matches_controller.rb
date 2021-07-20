class MatchesController < ApplicationController
  before_action :authenticate

  def create
    opponent = Player.find_by_name(match_params[:opponent])
    players = [@player, opponent]
    players.shuffle!
    match = Match.create(noughts: players[0], crosses: players[1], accepted_moves: 0, result: 'unknown')
    PlayerChannel.broadcast_to opponent, { event: 'challenge', match: match.details }
    render json: match.details, status: :created
  end

  def move # rubocop:disable Metrics/AbcSize
    @match = Match.find(move_params[:id])
    return head :forbidden unless @player == @match.noughts || @player == @match.crosses
    return invalid_move_response unless @match.valid_move?(@player, move_params[:cell])

    accept_move

    MoveChannel.broadcast_to @match,
                             { event: 'move', player: @player.name, cell: move_params[:cell],
                               result: @match.result }
    valid_move_response
  end

  private

  def match_params
    params.permit(:opponent)
  end

  def move_params
    params.permit(:id, :cell)
  end

  def valid_move_response
    render json: { accepted: true, result: @match.result }
  end

  def invalid_move_response
    render json: { accepted: false, result: @match.result }
  end

  def accept_move
    ActiveRecord::Base.transaction do
      Move.create(match_id: @match.id, number: @match.accepted_moves, cell: move_params[:cell])
      @match.reload

      @match.accepted_moves += 1
      @match.result = @match.determine_result
      @match.save
    end
  end
end
