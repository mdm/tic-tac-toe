class MatchesController < ApplicationController
  before_action :authenticate

  def create
    opponent = Player.find_by_name(match_params[:opponent])
    players = [@player, opponent]
    players.shuffle!
    match = Match.create(noughts: players[0], crosses: players[1], accepted_moves: 0, finished: false)
    PlayerChannel.broadcast_to opponent, { event: 'challenge', match: match_details(match) }
    render json: match_details(match), status: :created
  end

  def move # rubocop:disable Metrics/AbcSize
    @match = Match.find(move_params[:match])
    return head :forbidden unless @player == @match.noughts || @player == @match.crosses
    return invalid_move_response unless valid_move?

    Move.create(match: @match, number: @match.accepted_moves, cell: move_params[:cell])

    @match.accepted_moves += 1
    @match.finished = finished?
    @match.save

    MoveChannel.broadcast_to @match, { event: 'move', player: @player.name, cell: move_params[:cell] }
    valid_move_response
  end

  private

  def match_params
    params.permit(:opponent, :match)
  end

  def move_params
    params.permit(:match, :cell)
  end

  def match_details(match)
    { id: match.id, noughts: match.noughts.name, crosses: match.crosses.name }
  end

  def valid_move_response
    render json: { accepted: true, finished: @match.finished }
  end

  def invalid_move_response
    render json: { accepted: false, finished: @match.finished }
  end

  def valid_move?
    return false if @player == @match.noughts && @match.accepted_moves.odd?
    return false if @player == @match.crosses && @match.accepted_moves.even?

    move_at(move_params[:cell]).nil?
  end

  def move_at(cell)
    @match.moves.find_index { |move| move.cell == cell }
  end

  def same_color?(cells)
    all_noughts = cells.none? do |cell|
      move = move_at(cell)
      move.nil? || move.number.odd?
    end

    all_crosses = cells.none? do |cell|
      move = move_at(cell)
      move.nil? || move.number.even?
    end

    all_noughts || all_crosses
  end

  def finished_row?
    (0..2).each do |row|
      cells = (0..2).map { |column| row * 3 + column }
      return true if same_color?(cells)
    end

    false
  end

  def finished_column?
    (0..2).each do |column|
      cells = (0..2).map { |row| row * 3 + column }
      return true if same_color?(cells)
    end

    false
  end

  def finished_diagonal?
    cells = (0..2).map { |i| i * 3 + i }
    return true if same_color?(cells)

    cells = (0..2).map { |i| (2 - i) * 3 + i }
    return true if same_color?(cells)

    false
  end

  def finished?
    finished_row? || finished_column? || finished_diagonal?
  end
end
